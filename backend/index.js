require("dotenv-safe").config();
const express = require("express");
const bodyParser = require("body-parser");
const mysqlConnection = require("./db/mysql");

const app = express();
const cors = require('cors');
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/all-collections-info', (req, res) => {
    const info = mysqlConnection.query(`SELECT *
    FROM opensea_top100
    LEFT OUTER JOIN tw_user
    ON opensea_top100.twitter_username = tw_user.username;`, (err, results) => {
        if (err) res.status(500).send(err);
        res.send(results);
    });
});

app.get('/tweets/:slug', async (req, res) => {
    const slug = req.params.slug;
    const body = req.body;
    if (!body || !body.startDate || !body.endDate) {
        res.status(400).send("Missing startDate / endDate in req body");
        return;
    }
    let startDate = new Date(new Date(body.startDate).setUTCHours(0, 0, 0, 0));
    const endDate = new Date(new Date(body.endDate).setUTCHours(0, 0, 0, 0));
    const msInDay = 1000 * 60 * 60 * 24;
    const obj = {};
    while (startDate <= endDate) {
        try {
            const endOfDay = new Date(startDate.valueOf() + msInDay - 1);
            const tweets = await getTweetsFromDatePeriod(slug, startDate, endOfDay);
            obj[startDate.toUTCString()] = tweets;
            startDate = new Date(startDate.valueOf() + msInDay);
        } catch (err) {
            res.status(500).send(err);
            return;
        }
    }
    res.send(obj);
});

async function getTweetsFromDatePeriod(slug, startDate, endDate) {
    return new Promise((res, rej) => {
        mysqlConnection.query(`
        SELECT A.slug, A.twitter_username,
        B.user_id, B.followers_count,
        C.tweet_id, C.author_id, C.query, C.retweet_count, C.reply_count, C.like_count, C.created
        FROM opensea_top100 as A, tw_user as B, tw_tweet as C
        WHERE A.twitter_username = B.username
            AND B.user_id = C.author_id
            AND A.slug = ?
            AND C.created BETWEEN ? AND ?
        ORDER BY A.id DESC;
        `, [slug, startDate, endDate], (err, results) => {
            if (err) rej(err);
            res(results);
        });
    });
}

app.listen(process.env.PORT);
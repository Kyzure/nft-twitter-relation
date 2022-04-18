require("dotenv-safe").config();
const express = require("express");
const bodyParser = require("body-parser");
const mysqlConnection = require("./db/mysql");

const app = express();
const cors = require('cors');
const convertDateTime = (date) => { return "'" + date.toISOString().slice(0, 19).replace('T', ' ').replace('-', '/').replace('-', '/') + "'"};

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send(req.query.test);
});

app.get('/all-collections-info', (req, res) => {
    if (!req.query || !req.query.date) {
        res.status(400).send("Missing date in params");
        return;
    }
    const startDate = !req.query || !req.query.date
        ? new Date(new Date().setUTCHours(0, 0, 0, 0))
        : new Date(new Date(req.query.date).setUTCHours(0, 0, 0, 0));
    const msInDay = 1000 * 60 * 60 * 24;
    const endDate = new Date(startDate.valueOf() + msInDay);
    const sd = convertDateTime(startDate);
    const ed = convertDateTime(endDate);
    mysqlConnection.query(`SELECT opensea_top100.name, opensea_top100.average_price, tw_user.followers_count
    FROM opensea_top100, tw_user
    WHERE opensea_top100.twitter_username = tw_user.username
    AND opensea_top100.created between ? and ?`, [sd, ed], (err, results) => {
        if (err) res.status(500).send(err);
        res.send(results);
    });
});

app.get('/tweets/:slug', async (req, res) => {
    const slug = req.params.slug;
    const body = req.query;
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
            const tweets = await getTweetsFromSingleDate(slug, startDate);
            obj[startDate.toUTCString()] = tweets;
            startDate = new Date(startDate.valueOf() + msInDay);
        } catch (err) {
            res.status(500).send(err);
            return;
        }
    }
    res.send(obj);
});

async function getTweetsFromSingleDate(slug, date) {
    return new Promise((res, rej) => {
        const year = date.getFullYear();
        const monthStr = `${date.getMonth() + 1}`.padStart(2, "0");
        const dayStr = `${date.getDate()}`.padStart(2, "0");
        const dateSearchStr = `${year}-${monthStr}-${dayStr}T%`;
        const queryStr = `
        WITH X AS (
            SELECT DISTINCT twitter_username 
            FROM opensea_top100 
            WHERE slug = ?
        ),
        Y AS (
            SELECT user_id, followers_count, twitter_username 
            FROM tw_user
            JOIN X
            ON username = X.twitter_username
            ORDER BY followers_count DESC
            LIMIT 1
        ),
        Z AS (
            SELECT tweet_id, author_id, MAX(retweet_count) as retweet_count, MAX(reply_count) as reply_count, MAX(like_count) as like_count, created_at
            FROM tw_tweet
            GROUP BY tweet_id, author_id, created_at
        )

        SELECT B.user_id, B.followers_count,
        C.tweet_id, C.author_id, C.retweet_count, C.reply_count, C.like_count, C.created_at
        FROM Y as B, Z as C
            WHERE B.user_id = C.author_id
            AND C.created_at LIKE ?
            AND (C.tweet_id, C.retweet_count) IN
                (
                    SELECT tweet_id, MAX(retweet_count) as retweet_count
                    FROM tw_tweet
                    GROUP BY tweet_id
                )
        ORDER BY C.tweet_id DESC;
        `;
        mysqlConnection.query(queryStr, [slug, dateSearchStr], (err, results) => {
            if (err) rej(err);
            res(results);
        });
    });
}

app.listen(process.env.PORT);
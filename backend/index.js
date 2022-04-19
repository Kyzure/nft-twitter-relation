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

app.get('/all-collections-names', (req, res) => {
    mysqlConnection.query(`SELECT DISTINCT name FROM opensea_top100`, (err, results) => {
        if (err) res.status(500).send(err);
        res.send(results);
    })
})

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
    mysqlConnection.query(`
    WITH opensea_latest AS (
        SELECT name, MAX(average_price), MAX(floor_price), MAX(total_volume), MAX(total_sales), MAX(total_supply), MAX(count), MAX(num_owners), MAX(market_cap), MAX(twitter_username), MAX(created)
        FROM opensea_top100
        WHERE created between ${sd} AND ${ed} AND twitter_username IS NOT NULL
        GROUP BY name
      ), Z AS (
        SELECT author_id, SUM(retweet_count) as retweet_count, SUM(reply_count) as reply_count, SUM(like_count) as like_count
        FROM tw_tweet
        GROUP BY author_id
      )
      SELECT DISTINCT opensea_latest.name, opensea_latest.average_price, opensea_latest.floor_price, opensea_latest.total_volume, opensea_latest.total_sales, opensea_latest.total_supply, opensea_latest.count, opensea_latest.num_owners, opensea_latest.market_cap, Z.retweet_count, Z.reply_count,tw_user.followers_count, tw_user.tweet_count
      FROM opensea_latest, tw_user, Z
      WHERE opensea_latest.twitter_username = tw_user.username AND tw_user.user_id = Z.author_id
      AND tw_user.created between ${sd} and ${ed}`, (err, results) => {
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
            const tweets = await getTweetInfoOneDate(slug, startDate);
            obj[startDate.toUTCString()] = tweets;
            startDate = new Date(startDate.valueOf() + msInDay);
        } catch (err) {
            res.status(500).send(err);
            return;
        }
    }
    res.send(obj);
});

async function getTweetInfoOneDate(name, date) {
    return new Promise((res, rej) => {
        const year = date.getFullYear();
        const monthStr = `${date.getMonth() + 1}`.padStart(2, "0");
        const dayStr = `${date.getDate()}`.padStart(2, "0");
        const dateSearchStr = `${year}-${monthStr}-${dayStr}%`;
        const sd = convertDateTime(date)
        const msInDay = 1000 * 60 * 60 * 24;
        const endDate = new Date(date.valueOf() + msInDay);
        const ed = convertDateTime(endDate);
        const queryStr = `
            WITH X AS (
            SELECT DISTINCT twitter_username, one_day_sales, one_day_average_price
            FROM opensea_top100
            WHERE name = '${name}' AND created BETWEEN ${sd} AND ${ed}
            ),
            Y AS (
            SELECT user_id, twitter_username, one_day_sales, one_day_average_price
            FROM tw_user JOIN X ON username = X.twitter_username
            ORDER BY followers_count DESC, one_day_average_price DESC
            LIMIT 1
            ),
            Z AS (
            SELECT author_id, SUM(retweet_count) as retweet_count, SUM(reply_count) as reply_count, SUM(like_count) as like_count
            FROM tw_tweet
            WHERE created_at LIKE '${dateSearchStr}'
            GROUP BY author_id
            )
            
            SELECT retweet_count, reply_count, like_count, one_day_sales, one_day_average_price, '${dateSearchStr.slice(0, -1)}'
            FROM Y, Z
            WHERE Y.user_id = Z.author_id;
        `;
        mysqlConnection.query(queryStr, (err, results) => {
            if (err) rej(err);
            res(results);
        });
    });
}

async function getTweetsFromSingleDate(slug, date) {
    return new Promise((res, rej) => {
        const year = date.getFullYear();
        const monthStr = `${date.getMonth() + 1}`.padStart(2, "0");
        const dayStr = `${date.getDate()}`.padStart(2, "0");
        const dateSearchStr = `${year}-${monthStr}-${dayStr}%`;
        const queryStr = `
        WITH X AS (
            SELECT DISTINCT twitter_username 
            FROM opensea_top100 
            WHERE slug = '${slug}'
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
            AND C.created_at LIKE '${dateSearchStr}'
            AND (C.tweet_id, C.retweet_count) IN
                (
                    SELECT tweet_id, MAX(retweet_count) as retweet_count
                    FROM tw_tweet
                    GROUP BY tweet_id
                )
        ORDER BY C.tweet_id DESC;
        `;
        mysqlConnection.query(queryStr, (err, results) => {
            if (err) rej(err);
            res(results);
        });
    });
}

app.listen(process.env.PORT);

require("dotenv-safe").config();
const express = require("express");
const bodyParser = require("body-parser");
const mysqlConnection = require("./db/mysql");

const app = express();
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

app.get('/tweets/:slug', (req, res) => {
    const slug = req.params.slug;
    const body = req.body;
    if (!body || !body.startDate || !body.endDate) {
        res.status(400).send("Missing startDate / endDate in req body");
    }
    const startDate = new Date(body.startDate);
    const endDate = new Date(body.endDate);
    mysqlConnection.query(`
    SELECT C.* FROM opensea_top100 as A, tw_user as B, tw_tweet as C
    WHERE A.twitter_username = B.username
    AND B.user_id = C.author_id
    AND A.slug = ?
    AND C.created BETWEEN ? AND ?;
    `, [slug, startDate, endDate], (err, results) => {
        if (err) res.status(500).send(err);
        res.send(results);
    });
})

app.listen(process.env.PORT);
require("dotenv-safe").config();
const express = require("express");
const mysqlConnection = require("./db/mysql");

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/collection-info', (req, res) => {
    mysqlConnection.query(`SELECT *
    FROM opensea_top100
    LEFT OUTER JOIN tw_user
    ON opensea_top100.twitter_username = tw_user.username;`)
});

app.listen(port);
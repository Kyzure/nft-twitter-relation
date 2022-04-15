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
    ON opensea_top100.twitter_username = tw_user.username;`);
    console.log('info :', info);
});

app.get('/tweets/:slug', (req, res) => {
    const slug = req.params.slug;
    const body = req.body;
    if (!body || !body.startDate || !body.endDate) {
        res.statusCode(400).send("Missing startDate / endDate in req body");
    }
    const startDate = new Date(body.startDate);
    const endDate = new Date(body.endDate);
    const tweetsInDateRange = mysqlConnection.query(`SELECT *
    FROM tweets
    WHERE 
        username in (
            SELECT twitter_username FROM opensea_top100
            WHERE 
                opensea_top100.slug = ?
            LIMIT 1
        ) AND created_at BETWEEN ? AND ?
        date_created
    `, [slug, startDate, endDate]);
    const nftSalesInDateRange = mysqlConnection.query(`
        SELECT slug, twitter_username, one_day_sales, one_day_average_price FROM 
        
    `)
    
})

app.listen(process.env.PORT);
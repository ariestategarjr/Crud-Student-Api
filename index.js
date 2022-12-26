const express = require('express');
const db = require('./connection');
const bodyParser = require('body-parser');
const app = express();
const port = 8000;

app.get('/', (req, res) => {
    const sql = `SELECT * FROM student`;
    db.query(sql, (error, result) => {
        if (error) throw error;
        const data = JSON.parse(JSON.stringify(result));
        // console.log(data);
        // res.send(data);
    }); 
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

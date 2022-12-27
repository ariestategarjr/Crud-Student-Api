const express = require('express');
const db = require('./connection');
const bodyParser = require('body-parser');
const response = require('./response');
const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    response(200, "API ready to go", "SUCCESS", res);
});

app.get('/student', (req, res) => {
    const sql = `SELECT * FROM student`;
    db.query(sql, (error, result) => {
        if (error) throw error;
        const data = JSON.parse(JSON.stringify(result));
        response(200, data, "get all data", res);
    }); 
});

app.get('/search', (req, res) => {
    const sql = `SELECT nama, kelas, alamat FROM student WHERE nim = ${req.query.nim}`;
    db.query(sql, (error, result) => {
        if (error) throw error;
        const data = JSON.parse(JSON.stringify(result));
        response(200, data, 'search data by nim', res);
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

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

app.get('/student/:nim', (req, res) => {
    const nim = req.params.nim;
    const sql = `SELECT * FROM student WHERE nim = ${nim}`;
    db.query(sql, (error, result) => {
        if (error) throw error;
        const data = JSON.parse(JSON.stringify(result));
        response(200, data, "get data by nim", res);
    });
});

app.post('/student', (req, res) => {
    const { nim, nama, kelas, alamat } = req.body;
    const sql = `INSERT INTO student VALUES (NULL, ${nim}, '${nama}', '${kelas}', '${alamat}')`;
    db.query(sql, (error, result) => {
        if (error) response(500, "error", "insert data invalid", res);
        if (result?.affectedRows) {
            const data = {
                isSuccess: result.affectedRows,
                id: result.insertId
            };
            response(200, data, "insert data ok", res);
        }
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

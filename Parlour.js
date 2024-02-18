const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

// Create/connect to SQLite database
const db = new sqlite3.Database('contacts.db');

// Create table if not exists
db.run(`CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    firstName TEXT,
    middleName TEXT,
    lastName TEXT,
    mobNumber TEXT,
    email TEXT,
    enquiryType TEXT,
    date TEXT
)`);

// Middleware to parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route to handle form submission
app.post('/submit', (req, res) => {
    const { firstName, middleName, lastName, mobNumber, email, enquiryType, date } = req.body;

    // Insert form data into the database
    db.run(`INSERT INTO contacts (firstName, middleName, lastName, mobNumber, email, enquiryType, date) 
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [firstName, middleName, lastName, mobNumber, email, enquiryType, date], 
            (err) => {
                if (err) {
                    console.error(err.message);
                    res.status(500).send('Internal Server Error');
                } else {
                    res.status(200).send('Form submitted successfully');
                }
            });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

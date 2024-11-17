// server.js
require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const app = express();
const PORT = 3000;

const cors = require('cors');

const bodyParser = require('body-parser');

// Middleware to parse JSON and handle CORS
app.use(cors());
app.use(bodyParser.json()); // Parses application/json
app.use(bodyParser.urlencoded({ extended: true })); // Parses application/x-www-form-urlencoded


// Connect to the MySQL database

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "hostfinder"
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database');
});

// Serve static files
app.use(express.static('public'));

// Fetch single accommodation by ID
app.get('/api/accommodation/:id', (req, res) => {
    const accommodationId = req.params.id;

    const query = 'SELECT * FROM accommodation WHERE accommodation_id = ?';
    db.query(query, [accommodationId], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Accommodation not found' });
        }
        res.status(200).json(results[0]);
    });
});


// API route to fetch accommodations data
app.get('/api/accommodation', (req, res) => {
    const sql = 'SELECT * FROM accommodation';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).json({ error: 'Database error' });
        } else {
            res.json(results);
        }
    });
});

app.get('/api/accommodation', (req, res) => {
    const ownerId = req.query.owner_id;

    const query = 'SELECT * FROM accommodation WHERE owner_id = ?';
    db.query(query, [ownerId], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ success: false, message: 'Database error' });
        }

        res.json(results);
    });
});

app.put('/api/accommodation/:id', (req, res) => {
    const accommodationId = req.params.id;
    const { accommodation_name, description } = req.body;

    const query = 'UPDATE accommodation SET accommodation_name = ?, description = ? WHERE accommodation_id = ?';
    db.query(query, [accommodation_name, description, accommodationId], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ success: false, message: 'Database error' });
        }

        res.json({ success: true, message: 'Accommodation updated successfully' });
    });
});
// ---------------------------roommate------------------------------------
app.get('/api/roommates', (req, res) => {
    const query = 'SELECT * FROM roommate_requests';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ success: false, message: 'Database error' });
        }
        res.json(results);
    });
});

app.get('/api/roommate/:id', (req, res) => {
    const requestId = req.params.id;

    const query = 'SELECT * FROM roommate_requests WHERE request_id = ?';
    db.query(query, [requestId], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ success: false, message: 'Database error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ success: false, message: 'Roommate request not found' });
        }

        res.json(results[0]);
    });
});


// ---------------------------login------------------------------------

app.post('/api/owner/login', (req, res) => {
    const { email, password } = req.body;

    const query = 'SELECT owner_id, email FROM owner WHERE email = ? AND password = ?';
    db.query(query, [email, password], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ success: false, message: 'Database error' });
        }

        if (results.length > 0) {
            const owner = results[0];
            res.json({ success: true, owner_id: owner.owner_id });
        } else {
            res.status(400).json({ success: false, message: 'Invalid email or password' });
        }
    });
});

app.post('/api/owner/register', (req, res) => {
    console.log('Request Body:', req.body); // Log the incoming request body

    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    const query = 'SELECT email FROM owner WHERE email = ?';
    db.query(query, [email], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ success: false, message: 'Database error' });
        }

        if (results.length > 0) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        const insertQuery = 'INSERT INTO owner (email, password) VALUES (?, ?)';
        db.query(insertQuery, [email, password], (err, results) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ success: false, message: 'Database error' });
            }

            res.json({ success: true, message: 'Registration successful' });

        });
    });
});

app.post('/api/user/login', (req, res) => {
    const { email, password } = req.body;

    const query = 'SELECT user_id FROM user WHERE email = ? AND password = ?';
    db.query(query, [email, password], (err, results) => {
        if (err) {
            console.error('Error during login:', err);
            return res.status(500).json({ success: false, message: 'Database error' });
        }

        if (results.length > 0) {
            res.status(200).json({ success: true, user_id: results[0].user_id });
        } else {
            res.status(401).json({ success: false, message: 'Invalid email or password' });
        }
    });
});

app.post('/api/user/register', (req, res) => {
    const { email, password } = req.body;

    const query = 'INSERT INTO user (email, password) VALUES (?, ?)';
    db.query(query, [email, password], (err, results) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ success: false, message: 'Email already exists' });
            }
            console.error('Error during registration:', err);
            return res.status(500).json({ success: false, message: 'Database error' });
        }

        res.status(201).json({ success: true, message: 'Registration successful' });
    });
});

// ---------------------------------------deledt-----------------------------

app.delete('/api/accommodation/:id', (req, res) => {
    const query = 'DELETE FROM accommodation WHERE accommodation_id = ?';
    db.query(query, [req.params.id], (err) => {
        if (err) {
            console.error('Error deleting accommodation:', err);
            res.status(500).json({ error: 'Database error' });
        } else {
            res.status(200).json({ message: 'Accommodation deleted successfully' });
        }
    });
});

app.delete('/api/roommate/:id', (req, res) => {
    const query = 'DELETE FROM roommate_requests WHERE request_id = ?';
    db.query(query, [req.params.id], (err) => {
        if (err) {
            console.error('Error deleting roommate request:', err);
            res.status(500).json({ error: 'Database error' });
        } else {
            res.status(200).json({ message: 'Roommate request deleted successfully' });
        }
    });
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

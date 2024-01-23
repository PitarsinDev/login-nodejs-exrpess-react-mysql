const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'login_nodejs'
});

db.connect((err) => {
    if (err) {
        console.error('Error connection to database');
    } else {
        console.log('Connected to database');
    }
});

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
  
    const userQuery = 'SELECT * FROM users WHERE username = ?';
    db.query(userQuery, [username], async (error, results) => {
      if (error) {
        console.error('Error querying database:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
        return;
      }
  
      if (results.length === 0) {
        res.status(401).json({ success: false, message: 'Invalid username or password' });
        return;
      }
  
      const user = results[0];
  
      const match = await bcrypt.compare(password, user.password);
  
      if (match) {
        res.json({ success: true, message: 'Login successful' });
      } else {
        res.status(401).json({ success: false, message: 'Invalid username or password' });
      }
    });
  });

app.listen(port, () => {
    console.log('Server is running');
});
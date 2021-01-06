const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const pool = require('./db');
const { saltHashPassword, validatePassword } = require('./services/registerUser');

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(cors());

app.get('/info', (req, res) => res.send({ success: true }));
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const { hash, salt } = saltHashPassword(password);
  const query = `INSERT INTO users (username, email, password, salt) VALUES ('${username}', '', '${hash}', '${salt}');`;
  try {
    const client = await pool.connect();
    const result = await client.query(query);
    client.release();
    if (result) {
      res.send({ success: true });
    }
  } catch (e) {
    res.send({ success: false });
  }
});
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const query = `SELECT * FROM users WHERE username='${username}'`;
  try {
    const client = await pool.connect();
    const result = await client.query(query);
    const results = { results: (result) ? result.rows : null };
    client.release();
    const user = results.results[0];
    const isPasswordCorrect = validatePassword(password, user.salt, user.password);
    res.send({ success: isPasswordCorrect });
  } catch (e) {
    res.send({ success: false });
  }
});
app.get('/users', async (req, res) => {
  const client = await pool.connect();
  const result = await client.query('SELECT * FROM users');
  const results = { results: (result) ? result.rows : null };
  res.send(results);
  client.release();
});
app.get('/', (req, res) => res.send('TADA!'));
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));

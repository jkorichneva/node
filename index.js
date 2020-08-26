const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(cors());

app.get('/info', (req, res) => res.send({ success: true }));
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'pass12345') {
    res.send({ success: true });
  } else {
    res.send({ success: false });
  }
  res.send({ success: true });
});
app.get('/', (req, res) => res.send('TADA!'));
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));

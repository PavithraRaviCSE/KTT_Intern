const express = require('express');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const app = express();
const port = 3000;

const SECRET_KEY = '12345';
app.use(cookieParser());

app.use(express.json());
let users = [
  { id: 1, name: 'pavi', password: '1234' },
  { id: 2, name: 'Nivedha', password: 'password456' }
];

const verifyToken = (req, res, next) => {
  const token = req.cookies.token; 
  if (!token) {
    return res.status(403).send('Access denied. No token provided.');
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).send('Invalid token.');
    }
    req.user = decoded; 
    next();
  });
};

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.name === username && u.password === password);

  if (!user) {
    return res.status(400).send('Invalid credentials');
  }

  const token = jwt.sign({ id: user.id, name: user.name }, SECRET_KEY, { expiresIn: '1h' });

  res.cookie('token', token, { httpOnly: true, secure: false, maxAge: 3600000 });

  res.status(200).send('Logged in successfully');
});

app.get('/users/:id', verifyToken, (req, res) => {
  const id = req.params.id;
  const user = users.find(user => user.id == id);

  if (user) {
    res.send(user);
  } else {
    res.status(404).send(`No user found with id: ${id}`);
  }
});

app.get('/', (req, res) => {
    throw new Error('Something went wrong!');
});

// Error-handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

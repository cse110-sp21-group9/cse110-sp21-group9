const express = require('express'); // Creates an instance of an Express application
const path = require('path'); // The path module provides utilities for working with file
// and directory paths.
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const mongoAtlasUri = 'mongodb+srv://BujoStudio:powellmon2134@cluster0.2hihe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const User = require('./backend/model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { ESLint } = require('eslint');

const JWT_SECRET = 'jkotgklsndfivlkajrg';

try {
  // Connect to the MongoDB cluster
  mongoose.connect(
    mongoAtlasUri,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('Mongoose is connected!')
  );
} catch (e) {
  console.log('Could not connect');
}

// CLUSTER
// DATABASES
// DOCUMENTS

const app = express();
app.use(bodyParser.json());

const port = process.env.PORT || 8080;

// serve static files from the `source` folder
console.log('The absolute path of working directory ' + __dirname);
// router object
const router = express.Router();

app.get('/', (req, res) => {
  res.sendFile('/frontend/app/page-homepage/homepage.html', { root: __dirname });
});
router.get('/homepage.html', function(req, res) {
  res.sendFile('/frontend/app/page-homepage/homepage.html', { root: __dirname });
});
router.get('/homepage/homepage.html', function(req, res) {
  res.sendFile('/frontend/app/page-homepage/homepage.html', { root: __dirname });
});
router.get('/page-login/login.html', function(req, res) {
  res.sendFile('/frontend/app/page-login/login.html', { root: __dirname });
});
router.get('/page-signup/signup.html', function(req, res) {
  res.sendFile('/frontend/app/page-signup/signup.html', { root: __dirname });
});

app.post('/api/login', async(req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username }).lean();

  if (!user) {
    return res.json({ status: 'error', error: 'Invalid username/password' });
  }

  // console.log("password: " + password);
  // console.log("user.password: " + user.password);

  const loginState = bcrypt.compare(password, user.password);

  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({
      id: user._id,
      username: user.username
    }, JWT_SECRET);

    return res.json({ status: 'ok', data: token });
  }

  res.json({ status: 'error', error: 'Invalid username/password' });
});
app.post('/api/register', async(req, res) => {
  const { username, password: plainTextPassword } = req.body;

  if (!username || typeof username !== 'string') {
    return res.json({ status: 'error', error: 'Invalid username' });
  }
  if (!plainTextPassword || typeof plainTextPassword !== 'string') {
    return res.json({ status: 'error', error: 'Invalid password' });
  }
  if (plainTextPassword.length < 5) {
    return res.json({
      status: 'error',
      error: 'Password too small. Should be atleast 6 characters'
    });
  }

  const password = await bcrypt.hash(plainTextPassword, 10);

  try {
    const response = await User.create({
      username,
      password
    });
    console.log('User created successfully: ', response);
  } catch (error) {
    if (error.code === 11000) {
      // duplicate key
      return res.json({ status: 'error', error: 'Username already in use' });
    }
    throw error;
  }
});

module.exports = router;

app.use(express.static(__dirname + '/public/'));

app.use(express.static(__dirname)); // Add
app.use('/', router); // Add router to application
app.listen(port, () => {
  console.log('Server started at http://localhost:' + port);
});

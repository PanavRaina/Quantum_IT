// const express = require('express');
// const mongoose = require('mongoose');
// const jwt = require('jsonwebtoken');
// const cors = require('cors');
// const bcrypt = require('bcryptjs');
// const User = require('./models/User'); // Make sure to create this model

// const app = express();
// const PORT = 5000;

// app.use(express.json());
// app.use(cors());

// mongoose.connect('mongodb://localhost:27017/yourdbname', { useNewUrlParser: true, useUnifiedTopology: true });

// app.post('/api/register', async (req, res) => {
//   const { name, dob, email, password } = req.body;

//   const hashedPassword = await bcrypt.hash(password, 10);
//   const user = new User({ name, dob, email, password: hashedPassword });
  
//   try {
//     const savedUser = await user.save();
//     const token = jwt.sign({ id: savedUser._id }, 'your_jwt_secret');
//     res.json({ token, user: savedUser });
//   } catch (err) {
//     res.status(400).json({ error: 'Error saving user' });
//   }
// });

// app.post('/api/login', async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email });

//   if (!user) {
//     return res.status(400).json({ error: 'User not found' });
//   }

//   const isPasswordValid = await bcrypt.compare(password, user.password);
  
//   if (!isPasswordValid) {
//     return res.status(400).json({ error: 'Invalid password' });
//   }

//   const token = jwt.sign({ id: user._id }, 'your_jwt_secret');
//   res.json({ token, user });
// });

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 5000;
const JWT_SECRET = 'your_jwt_secret'; // Replace with your secret key

// Middlewares
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/authDB', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => console.log('MongoDB connected'))
//   .catch(err => console.log(err));
mongoose.connect('mongodb://127.0.0.1:27017/quantum').then(() => console.log('MongoDB connected')).catch(err => console.log(err));

// User schema and model
const UserSchema = new mongoose.Schema({
  name: String,
  dob: Date,
  email: { type: String, unique: true },
  password: String
});

const User = mongoose.model('User', UserSchema);

// Home Route
app.get('/', (req, res) => {
  res.send('Welcome to the Home Page!');
});

// Dashboard Route - Protected
app.get('/dashboard', authenticateToken, async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Registration Route
app.post('/register', async (req, res) => {
  const { name, dob, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, dob, email, password: hashedPassword });
    await user.save();
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { name, dob, email } });
  } catch (error) {
    res.status(400).json({ message: 'Registration failed' });
  }
});

// Login Route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { name: user.name, dob: user.dob, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: 'Login failed' });
  }
});

// Middleware to authenticate token
function authenticateToken(req, res, next) {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Access denied. Invalid token format.' });
  }

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token.' });
  }
}

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

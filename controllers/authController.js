const User = require('../models/UserModel'); 
const Session = require('../models/Session');

const authController = {};

authController.signup = (req, res, next) => {
  const { name, username, password } = req.body;

  console.log('Received signup request:', req.body);

  // Check if the user already exists
  User.findOne({ username })
  .then(user => {
    if (user) {
      console.log('User already exists:', username); // Log if user already exists
      return res.status(400).json({ message: 'User already exists' });
    } else {
      const newUser = new User({ name, username, password });
      return newUser.save();
    }
  })
  .then(() => {
    console.log('User signup successful:', username); // Log successful signup
    res.status(200).json({ message: 'User signup successful' });
  })
  .catch(() => next({
    log: 'authController.signup: Error creating new user',
    status: 500,
    message: { err: 'Error occurred during user registration' }
  }));
}

authController.login = (req, res, next) => {
  const { username, password } = req.body;
  
  User.findOne({ username, password })
    .then(user => {
      if (!user) {
        return res.status(400).json({ message: 'Invalid username or password' });
      }

      // Create a new session for the user
      const newSession = new Session({ userId: user._id });
      return newSession.save()
      .then(session => {
        res.cookie('sessionId', session._id, { httpOnly: true }); // Set a cookie with the session ID
        res.status(200).json({ message: 'Login successful' });
      });
    })
    .catch(() => next({
      log: 'authController.login: Error finding user',
      status: 500,
      message: { err: 'Error occurred during user login' }
    }));
}

module.exports = authController;
const User = require('../models/User'); // placeholder label and file location

const authController = {};

authController.signup = (req, res, next) => {
  const { name, email, password } = req.body;

  // Check if the user already exists
  User.findOne({ email })
  .then(user => {
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    } else {
      const newUser = new User({ name, email, password });
      return newUser.save();
    }
  })
  .then(() => {
    res.status(200).json({ message: 'User signup successful' });
  })
  .catch(() => next({
    log: 'authController.register: Error creating new user',
    status: 500,
    message: { err: 'Error occurred during user registration' }
  }));
}

authController.login = (req, res, next) => {
  
}

module.exports = authController;
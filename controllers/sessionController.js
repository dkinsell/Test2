const Session = require('../models/Session');

const sessionController = {};

sessionController.verifySession = (req, res, next) => {
  const sessionId = req.cookies.sessionController;

  if (!sessionId) {
    return res.status(401).json({ message: 'Session not found' });
  }

  Session.findById(sessionId)
  .then(session => {
    if (!session) {
      return res.status(401).json({ message: 'Session not found' });
    }

    req.session = session;
    return next();
  })
  .catch(err => next({
    log: 'sessionController.verifySession: Error verifying session',
    status: 500,
    message: { err: 'Error occurred during session verification' }
  }));
}

module.exports = sessionController;
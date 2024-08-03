const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/sessionController');

router.post('/verify', sessionController.verifySession);

module.exports = router;
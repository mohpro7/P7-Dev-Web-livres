const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const validateUser = require('../middleware/validateUser');
const userCtrl = require('../controllers/user');

router.post('/signup', validateUser, userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/test-admin', auth, userCtrl.testAdmin);

module.exports = router;
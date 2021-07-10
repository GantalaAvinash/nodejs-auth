const express = require('express');
const userControl = require('../../Controllers/user');
const router = express.Router();

router.route('/usersignUp').post(userControl.signUp);
router.route('/userlogin').post(userControl.login);
router.route('/userforgotpassword').put(userControl.forgotPassword);
router.route('/userresetpassword').put(userControl.resetpassword);

module.exports = router;
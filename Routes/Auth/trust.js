const express = require('express');
const trustControl= require('../../Controllers/trust');
const router = express.Router();

router.route('/trustsignUp').post(trustControl.signUp);
router.route('/trustlogin').post(trustControl.login);
router.route('/trustforgotpassword').put(trustControl.forgotPassword);
router.route('/trustresetpassword').put(trustControl.resetpassword);

module.exports = router;
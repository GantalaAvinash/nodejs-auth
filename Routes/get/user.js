const express = require('express');
const router = express.Router();
const getUser = require('../../Controllers/getUsers');
const getUserbyId = require('../../Controllers/getUserbyId')

router.route('/getuser').get(getUser.getUsers);
router.route('/getUserbyId/:user_id').get(getUserbyId.getUserbyId);



module.exports = router;
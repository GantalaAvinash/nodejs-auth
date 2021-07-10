const express = require('express');
const router = express.Router();
const getTrust = require('../../Controllers/getTrusts');
const getTrustbyId = require('../../Controllers/getTrustbyId');

router.route('/gettrust').get(getTrust.getTrusts);
router.route('/gettrustbyid/:trust_id').get(getTrustbyId.getTrustbyId);

module.exports = router;
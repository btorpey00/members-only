const express = require('express');
const router = express.Router();

const sign_in_controller = require('../controllers/signInController');

router.get('/', sign_in_controller.sign_in_get);

module.exports = router;
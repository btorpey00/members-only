var express = require('express');
var router = express.Router();
const index_controller = require('../controllers/indexController');

/* GET home page. */
router.get('/', index_controller.index);

router.get('/sign-out', index_controller.sign_out);

module.exports = router;

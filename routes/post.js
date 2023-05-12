var express = require('express');
var router = express.Router();
const post_controller = require('../controllers/postController')

router.get('/', post_controller.new_post_get);
router.post('/', post_controller.new_post_post);

module.exports = router;
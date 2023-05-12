var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('new-post', { title: 'New Post' })
});

module.exports = router;
let express = require('express');
let router = express.Router();
let Config = require('../config/facebook');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/dummy', function(req, res, next) {
  res.sendStatus(200);
});

router.post('/welcome_message/', function(req, res, next) {
    let welcome_msg = "Need help? Click here";
    res.json({
        "welcome_message" : welcome_msg,
        "chat_icon_status": true
    });
});

module.exports = router;

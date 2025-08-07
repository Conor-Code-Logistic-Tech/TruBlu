var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'Professional Financial Services',
    description: 'Transform your financial future with expert wealth management, retirement planning, and investment advisory services from TruBlu Financial.',
    isHome: true,
    currentYear: new Date().getFullYear()
  });
});

module.exports = router;

var express = require('express');
var router = express.Router();
var sql = require('mssql');

router.get('/all', function(req, res, next) {
    sql.connect("mssql://passsrv:pa$hw0rd@localhost").then(function() {
        res.send('all users');
    });
});

module.exports = router;

var express = require('express');
var router = express.Router();
var sql = require('mssql');

router.get('/all', function(req, res, next) {
    var connection = new sql.Connection({
        user: 'passsrv',
        password: 'pa$hw0rd',
        server: 'localhost',
        database: 'PassStore'
    });

    connection.connect(function(err) {
        var request = new sql.Request(connection);
        request.query("SELECT * FROM Passwords", function(err, recordset) {
            res.send(err || recordset);
        });

        connection.close();
    });
});

module.exports = router;

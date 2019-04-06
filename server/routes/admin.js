let express = require('express');
let router = express.Router();
let User = require("../models/users");

router.post('/login', function(req, res, next) {
    let userName = req.body.userName;
    let passWord = req.body.password;
    User.findOne({'userName': userName, 'userPwd': passWord, 'userRole': 'admin'}, function (err, doc) {
        if (err) {
            res.json({
                status: 1,
                message: err.message
            })
        } else {
            if (doc) {
                res.cookie("admin", userName, {
                    path: '/',
                    maxAge: 1000 * 60 * 60
                });
                res.json({
                    status: '0',
                    msg: 'success',
                    result: {userName}
                });
            } else {
                res.json({
                    status: '0',
                    msg: 'fail',
                    result: {}
                });
            }
        }
    })
});

router.post('/logout', function (req,res,next) {
    res.cookie("admin", "", {
        path: '/',
        maxAge: -1
    });
    res.json({
        status: '0',
        msg: '',
        result: {}
    });
});

module.exports = router;

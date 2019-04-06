let express = require('express');
let router = express.Router();
let Messages = require('../models/messages');

router.get("/", function (req, res, next) {
    let page = parseInt(req.param("page"));
    let pageSize = parseInt(req.param("pageSize"));
    let skip = pageSize * (page - 1);
    let sum;
    let messagesModel = Messages.find({}, (err, doc) => {
        if(err) {
            res.json({
                status: '1',
                msg: err.message
            });
        } else {
            sum = doc.length;
            messagesModel.sort({"messageId": -1}).skip(skip).limit(pageSize);
            messagesModel.exec(function (err,doc) {
                if(err) {
                    res.json({
                        status: '1',
                        msg: err.message
                    });
                } else {
                    res.json({
                        status: '0',
                        msg: '',
                        result: {
                            count: doc.length,
                            list: doc,
                            sum: sum
                        }
                    });
                }
            })
        }
    });
});

router.post("/addMessage", function (req, res, next) {
    let date = new Date();
    let messageModel = new Messages({
        name: req.body.name,
        text: req.body.message,
        time: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes()
    });
    Messages.find({}, function (err,doc,next) {
        if (err) {
            res.json({
                status: 1,
                message: err.message
            })
        } else {
            messageModel.messageId = doc.length + 1;
            messageModel.save(function (err, doc2) {
                if(err) {
                    res.json({
                        status: '1',
                        msg: err.message
                    });
                } else {
                    res.json({
                        status: '0',
                        msg: '',
                        result: {}
                    });
                }
            });
        }
    });
});

module.exports = router;

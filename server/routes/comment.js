let express = require('express');
let router = express.Router();
let Comments = require('../models/comments');

router.get("/", function (req, res, next) {
    let articleId = req.param("articleId");
    let commentModel;
    if (articleId) {
        commentModel = Comments.find({"articleId": articleId}).sort({"time": -1});
    } else {
        commentModel = Comments.find({});
    }
    commentModel.exec(function (err,doc) {
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
                    list: doc
                }
            });
        }
    })
});

router.post("/addComment", function (req, res, next) {
    let date = new Date();
    let commentModel = new Comments({
        name: req.body.name,
        text: req.body.comment,
        time: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes(),
        parentId: req.body.parentId,
        articleId: req.body.articleId
    });
    Comments.find({}, function (err,doc,next) {
        if (err) {
            res.json({
                status: 1,
                message: err.message
            })
        } else {
            commentModel.commentId = doc.length + 1;
            commentModel.save(function (err, doc2) {
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

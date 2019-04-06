let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let Articles = require('../models/articles');

mongoose.connect('mongodb://127.0.0.1:27017/myblog');

mongoose.connection.on("connected", function () {
    console.log("MongoDB connect successful")
});

mongoose.connection.on("error", function () {
    console.log("MongoDB connect failed")
});

mongoose.connection.on("disconnected", function () {
    console.log("MongoDB disconnected")
});

router.get("/", function (req, res, next) {
    let id = req.param("id");
    let articleModel;
    if (id) {
        articleModel = Articles.find({"articleId": id});
    } else {
        articleModel = Articles.find({});
    }
    articleModel.exec(function (err,doc) {
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

router.post("/addArticle", function (req, res, next) {
    let date = new Date();
    let articleModel = new Articles({
        'title': req.body.title,
        'subtitle': req.body.subtitle,
        'text': req.body.tinymceHtml,
        'type': req.body.type,
        'time': date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes()
    });
    console.log(articleModel.subtitle);
    Articles.find({}, function (err,doc) {
        if (err) {
            res.json({
                status: '1',
                msg: err.message
            })
        } else {
            articleModel.articleId = doc.length + 1;
            articleModel.save(function (err, doc2) {
                if (err) {
                    res.json({
                        status: '1',
                        msg: err.message
                    })
                } else {
                    res.json({
                        status: '0',
                        msg: 'success',
                        result: {}
                    })
                }
            })
        }
    });
});

module.exports = router;

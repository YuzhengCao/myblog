let express = require('express');
let router = express.Router();
let User = require("../models/users");

router.post('/login', function(req, res, next) {
  let userName = req.body.Id;
  User.find({}, function (err, doc) {
      if (err) {
          res.json({
              status: 1,
              message: err.message
          })
      } else {
          for (let item of doc) {
              if (item.userName == userName) {
                  res.cookie("userName",userName,{
                      path:'/',
                      maxAge:1000*60*60
                  });
                  res.json({
                      status:'0',
                      msg:'',
                      result:{userName}
                  });
                  return
              }
          }
          let userModel = new User({
              userName: Number(userName),
              userId: doc.length + 1
          });
          userModel.save(function (err, doc2) {
              if (err)
                  res.json({
                      status: '1',
                      msg: err.message
                  });
              else {
                  res.cookie("userName", userName, {
                      path: '/',
                      maxAge: 1000 * 60 * 60
                  });
                  res.json({
                      status: '0',
                      msg: '',
                      result: {userName}
                  });
              }
          });
      }
  })
});

router.post('/logout', function (req,res,next) {
    res.cookie("userName", "", {
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

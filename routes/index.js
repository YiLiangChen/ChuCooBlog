var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser');
var http = require('http').Server(app);
var fs = require('fs');
var cors = require('cors');
var jsonfile = require('jsonfile');

var _cookie = null;



var _userInfo = {

};

var _posts = [

//  {
//    id:0,
//    title:'',
//    content:'',
//    updated_at:'',
//    created_at:'',
//    author:{
//      username:'',
//      name:'',
//      gender:'',
//      adress:''
//    },
//    tag:[]
//  }
];

exports.login = function(req,res){
  var username = req.body.username;
  var password = req.body.password;
  if (username == 'admin' && password == '123456'){
    _cookie = 10000;
    res.cookie('_nodejs_session',_cookie,{ httpOnly: true });
    var user = Object.assign({},_userInfo);
    res.status(200).json({
      msg:'success'
    });
    //res.json(user);
  }else{
    res.status(401).json({
      msg:'wrong'
    });
  }
}

exports.logout = function(req,res){
  if( isLogin = (req.cookies._nodejs_session) ){
    _cookie = null;
    res.status(200).json({
      msg:'logout'
    });
  }else{
    res.status(401).json({
      msg:'no login'
    });
}
}

exports.getUserInfo = function(req,res){
  var user = fs.readFileSync('./userInfo.json','utf-8');
  //console.log(user);
  var _user = JSON.parse(user);
  res.json(_user);
/*
      var user = fs.readFile('./userInfo.json',function(err,buffer){
      var _user = JSON.stringify(user);
      if (err) throw err;
      console.log(_user);
      res.json(_user);
    });
*/
}

function isLogin(cookie){
  return cookie === _cookie;
}

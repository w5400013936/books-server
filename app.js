var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/book_shop',function(err){
  if(err){
    console.log('数据库连接失败');
  }
  else{
    console.log('数据库连接成功');
  }
});

global.pageSize = 9;

var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');
var usersRouter = require('./routes/users');
var booksRouter = require('./routes/books');
var bookTypeRouter = require('./routes/book_type');



var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// const adminUserData = [
//   {account:'admin',pwd:'admin'},
//   {account:'admin1',pwd:'123456'}
// ];

// app.post('/admin/login',(req,res)=>{
//   var account = req.body.account;
//   var pwd = req.body.password;
//   console.log(pwd)

//   var user = adminUserData.find(item=>{
//     return item.account == account;
//   })

//   if(user){
//     if(user.pwd == pwd){
//       res.cookie('adminAccount',account,{path:'/'});
//       res.json({
//         status:'y',
//         msg:'登录成功！'
//       });
//     }
//     else{
//       res.json({
//         status:'n',
//         msg:'用户密码错误！'
//       });
//     }
//   }
//   else{
//     res.json({
//       status:'n',
//       msg:'用户信息不存在！'
//     });
//   }
// });

// app.all('/admin/*',(req,res,next)=>{
//   var adminUserName = req.cookies.adminUserName;
//   if(adminUserName){
//     res.json({
//       status:'y',
//       msg:'已登录'
//     })
//     next();
//   }
//   else{
//     res.json({
//       status:'n',
//       msg:'未登录'
//     })
//   }
// })

// 后台设置允许跨域
app.all('/*',(req,res,next)=>{
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
	res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("Content-Type", "application/json;charset=utf-8");
	next();
})

// 前台路由
app.use('/', indexRouter);
app.use('/admin',adminRouter);
app.use('/users', usersRouter);
app.use('/books', booksRouter);
app.use('/bookType',bookTypeRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen('3004',()=>{
	console.log('服务端运行于3004端口...')
})

module.exports = app;

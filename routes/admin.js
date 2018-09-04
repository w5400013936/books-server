var express = require('express');
var router = express.Router();
var AdminDal = require('../schemas/admin').AdminDal;
var adminDal = new AdminDal();

router.post('/login',(req,res)=>{
    adminDal.login(req.body,data=>{
        var user = data.find(item=>{
            return item.userName == req.body.userName;
        })
        if(user){
            if(user.password == req.body.password){
                res.cookie('adminUserName',req.body.userName,{path:'/'});
                res.json({status:'y',msg:'登录成功！'});
            }
            else{
                res.json({status:'n',msg:'用户密码错误！'});
            }
        }
        else{
            res.json({status:'n',msg:'用户信息不存在！'});
        }
    })
})

router.post('/changePwd',(req,res)=>{
    var id = req.body._id;
    delete req.body._id
    adminDal.changePwd(id,req.body,(isOK)=>{
        if(isOK){
            res.json({msg:'密码修改成功！'});
        }
    })
})

module.exports = router;
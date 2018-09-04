var express = require('express');
var router = express.Router();
var BookTypeDal = require('../schemas/book_type').BookTypeDal;
var bookTypeDal = new BookTypeDal();

router.get('/',(req,res)=>{
    bookTypeDal.getData('',function(data){
        res.json(data);
    })
})

router.get('/name',(req,res)=>{
    console.log(req.query)
    var searchName = req.query.searchName || '';
    bookTypeDal.getData(searchName,data=>{
        res.json(data);
    })
})

router.post('/add',(req,res)=>{
    var data = req.body;
    bookTypeDal.save(data,isOK=>{
        if(isOK){
            res.json({msg:'添加成功'});
        }
    })
})

router.post('/update',(req,res)=>{
    var id = req.body.id;
    delete req.body.id;
    bookTypeDal.updateByID(id,req.body,isOK=>{
        if(isOK){
            res.json({msg:'修改成功'});
        }
    })
})

router.post('/delete',(req,res)=>{
    var id = req.body.id;
    bookTypeDal.del(id,isOK=>{
        if(isOK){
            res.json({msg:'删除成功'});
        }
    })
})

module.exports = router;
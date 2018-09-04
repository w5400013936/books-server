var express = require('express');
var router = express.Router();
var BookDal = require('../modules/books').BookDal;
var bookDal = new BookDal();

router.get('/',function(req,res,next){
    var page = 1;
    var typeFilter = {};
    if(req.query.page){
        page = Number(req.query.page);
    }
    if(req.query.type){
        typeFilter.type = req.query.type;
    }
    bookDal.getDataByPage(page,typeFilter,data=>{
        // res.render('books', {data:data.res});
        res.json({data:data});
    })
})

router.get('/id',function(req,res,next){
    var id = req.body.id || '';
    bookDal.getData({_id:id},data=>{
        // res.render('books', {data:data});
        res.json({data:data})
    })
})

router.get('/title',function(req,res,next){
    var title = req.query.title || '';
    bookDal.getDataByTitle(title,data=>{
        // res.render('books', {data:data});
        res.json({data:data})
    })
})

router.post('/update',(req,res)=>{
    var id = req.body.id;
    delete req.body.id
    bookDal.updateByID(id, req.body,isOK=>{
        if(isOK){
            res.json({msg:'修改成功',data:req.body});
        }
    })
})

router.post('/save',(req,res)=>{
    bookDal.save(req.body,isOK=>{
        if(isOK){
            res.json({msg:'添加成功',data:req.body});
        }
    })
})

router.post('/del',(req,res)=>{
    bookDal.del(req.body.id,isOK=>{
        if(isOK){
            res.json({msg:'删除成功'});
        }
    })
})


module.exports = router;
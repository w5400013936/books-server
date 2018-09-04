var db = require('../common/db_base');
var DBBase = db.DBBase;
var mongoose = db.mongoose;
var BooksSchema = require('../schemas/books');
var Book = mongoose.model('books',BooksSchema);

class BookDal extends DBBase{
    constructor(){
        super(Book);
    }

    getDataByPage(page,filter,callback){
        var pageSize = global.pageSize;
        this.model.count(filter)
            .then(count=>{
                var pageCount = Math.ceil(count / pageSize);
                if(page > pageCount){
                    page = pageCount;
                }
                if(page <= 0){
                    page = 1;
                }
                this.model.find(filter)
                    .skip(pageSize * (page - 1))
                    .limit(pageSize)
                    .populate('book_type')
                    .sort({_id:-1})
                    .then(res=>{
                        callback({pageCount:pageCount,bookList:res})
                    })
                    .catch(err=>{
                        console.log(err);
                    })
            })
    }

    getDataByTitle(searchName,callback){
        var filter = {};
        if(searchName){
            filter.title = new RegExp(searchName,'i');
        }
        this.model.find(filter)
            .sort({_id:-1})
            .then(res=>{
                callback(res)
            })
            .catch(err=>{
                console.log(err)
            })
    }

    updateByID(id, model ,callback){
        this.model.findByIdAndUpdate(id,model)
            .then(callback(true))
            .catch(err=>{
                console.log(err);
                callback(false);
            })
    }

    save(m,callback){
        var data = this.model(m);
        data.save()
            .then(callback(true,data))
            .catch(err=>{
                console.log(err);
                callback(false);
            })
    }
     
    del(id,callback){
        this.model.findByIdAndRemove(id)
            .then(callback(true))
            .catch(err=>{
                console.log(err);
                callback(false);
            })
    }
}

module.exports = {Book:Book,BookDal:BookDal};
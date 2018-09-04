var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/book_shop');

var Shchema = mongoose.Shchema;

var bookTypeSchema = new bookTypeSchema({
    name: String,
    code: String,
    url: String,
    page_count: Number
})
var BookType = mongoose.model('book_type',bookTypeSchema);

var db_book_type = {};

db_book_type.getData = function(searchName,callback){
    var filter = {};
    if(searchName){
        filter.name = new RegExp(searchName,'i');
    }
    BookType.find(filter)
        .sort({_id:-1})
        .then(res=>{
            callback(res);
        })
        .catch(err=>{
            console.log(err);
        })
}

db_book_type.save = function(model,callback){
    var data = new BookType(model);
    data.save()
        .then(callback(true))
        .catch(err=>{
            console.log(err);
            callback(false);
        })
}


db_book_type.updateByID = function(id,model,callback){
    BookType.findByIdAndUpdate(id,model)
        .then(callback(true))
        .catch(err=>{
            console.log(err);
            callback(false);
        })
}

db_book_type.del = function(id,callback){
    BookType.findByIdAndRemove(id)
        .then(callback(true))
        .catch(err=>{
            console.log(err);
            callback(false);
        })
}

db_book_type.findByID = function(id,callback){
    BookType.findById(id)
        .then(res=>{
            callback(res);
        })
        .catch(err=>{
            console.log(err);
        })
}
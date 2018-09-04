var db = require('../common/db_base');
var DBBase = db.DBBase;
var mongoose = db.mongoose;
var Schema = mongoose.Schema;

var bookTypeSchema = new Schema({
    name: String,
    code: String,
    url: String,
    page_count: Number
})
var BookType = mongoose.model('book_type',bookTypeSchema);

class BookTypeDal extends DBBase{
    constructor(){
        super(BookType);
    }

    getData(searchName,callback){
        var filter = {};
        if(searchName){
            filter.name = new RegExp(searchName,'i');
        }
        this.model.find(filter)
            .then(res=>{
                callback(res);
            })
            .catch(err=>{
                console.log(err)
            })
    }

    getDataByName(name,callback){
        this.model.findOne({
            name:name
        }).then(res=>{
            callback(res);
        }).catch(err=>{
            console.log(err)
        })
    }

    validateCode(code,callback){
        this.model.count({
            code:code
        }).then(res=>{
            if(res > 0){
                callback(false);
            }
            else{
                callback(true);
            }
        }).catch(err=>{
            console.log(err);
            callback(false);
        })
    }

    save(m,callback){
        var data = this.model(m);
        data.save()
            .then(callback(true))
            .catch(err=>{
                console.log(err);
                callback(false);
            })
    }

    updateByID(id,model,callback){
        this.model.findByIdAndUpdate(id,model)
            .then(callback(true))
            .catch(err=>{
                console.log(err);
                callback(false);
            })
    }

    del(id,callback){
        this.model.findByIdAndDelete(id)
            .then(callback(true))
            .catch(err=>{
                console.log(err);
                callback(false);
            })
    }
}

module.exports = {
    BookType:BookType,
    BookTypeDal:BookTypeDal
};
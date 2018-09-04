var db = require('../common/db_base');
var mongoose = db.mongoose;
var DBBase = db.DBBase;
var Schema = mongoose.Schema;

var adminSchema = new Schema({
    userName: String,
    password: String
})

var Admin = mongoose.model('admin',adminSchema);

class AdminDal extends DBBase{
    constructor(){
        super(Admin);
    }

    login(m,callback){
        var filter = {};
        filter.userName = new RegExp(m.userName,'i');
        this.model.find(filter)
            .then(res=>{
                callback(res);
            })
            .catch(err=>{
                console.log(err);
            })
    }

    changePwd(id,model,callback){
        this.model.findByIdAndUpdate(id,model)
            .then(callback(true))
            .catch(err=>{
                console.log(err);
                callback(false);
            })
    }
}

module.exports = {
    AdminDal: AdminDal
}
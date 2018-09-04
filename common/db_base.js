var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/book_shop');

/**
 * 数据库操作基础模型
 */
class DBBase{
    constructor(model){
        this.model = model;
    }
    
    /**
     * 分页取数据
     * @param  {[type]}   page     当前页码
     * @param  {[type]}   filter   查询条件
     * @param  {Function} callback 回调函数
     * @return {[type]}            [description]
     */
    getDataByPage(page,filter,callback){
        var pageSize = global.pageSize;
        this.model.count(filter)
            .then(count=>{
                var pageCount = Math.ceil(count/pageSize);
                if(page>pageCount){
                    page = pageCount;
                }
                if(page <= 0){
                    page = 1;
                }
                this.model.find(filter)
                    .limit(pageSize)
                    .skip(pageSize * (page - 1))
                    .sort({_id:-1})
                    .then(res=>{
                        callback({pageCount:pageCount,res:res});
                    })
                    .catch(err=>{
                        console.log(err)
                    })
            })
    }

    /**
     * 根据查询条件取数据
     * @param  {[type]}   filter   查询条件
     * @param  {Function} callback 回调函数
     * @return {[type]}            [description]
     */
    getData(filter,callback){
        this.model.find(filter)
            .then(res=>{
                callback(res);
            })
            .catch(err=>{
                console.log(err);
            })
    }

    /**
     * 保存数据到数据库
     * @param  {[type]}   m        需要保存的数据
     * @param  {Function} callback 回调函数
     * @return {[type]}            [description]
     */
    save(m,callback){
        var data = new this.model(m);
        data.save()
            .then(callback(true,data))
            .catch(err=>{
                console.log(err);
            })
    }

    /**
     * 根据id获取单条记录
     * @param  {[type]}   id       获取数据的id
     * @param  {Function} callback 回调函数
     * @return {[type]}            [description]
     */
    findByID(id,callback){
        this.model.findById(id)
            .then(res=>{
                callback(res);
            })
            .catch(err=>{
                console.log(err);
            })
    }

    /**
     * 根据id更新指定的记录
     * @param  {[type]}   id       需要更新的记录id
     * @param  {[type]}   model    需要更新到数据库的数据
     * @param  {Function} callback 回调函数
     * @return {[type]}            [description]
     */
    updateByID(id,model,callback){
        this.model.findByIdAndUpdate(id,model)
            .then(callback(true))
            .catch(err=>{
                console.log(err);
                callback(false);
            })
    }
    
    /**
     * 根据id删除指定的记录
     * @param  {[type]}   id       需要删除的id
     * @param  {Function} callback 回调函数
     * @return {[type]}            [description]
     */
    del(id,callback){
        this.model.findByIdAndRemove(id)
            .then(callback(true))
            .catch(err=>{
                console.log(err);
                callback(false);
            })
    }
}

module.exports = {DBBase:DBBase,mongoose:mongoose};
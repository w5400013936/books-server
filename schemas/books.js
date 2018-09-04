var db = require('../common/db_base');
var mongoose = db.mongoose;
var Schema = mongoose.Schema;

var BooksSchema = new Schema({
    title:String,
    author:String,
    img:String,
    link:String,
    price:{
        type:Number,
        default:0
    },
    publisher:String,
    type:String
});

BooksSchema.virtual('book_type',{
    ref:'book_type',
    localField:'type',
    foreignField:'code'
})

// BooksSchema.statics = {
//     fetch:function(cb){
//         return this
//             .find()
//             .sort('-1')
//             .exec(cb)
//     },
//     findById:function(id,cb){
//         return this
//             .findOne({_id:id})
//             .exec(cb)
//     },
//     findByType:function(type,cb){
//         return this
//             .find({type:type})
//             .exec(cb)
//     }
// }

module.exports = BooksSchema;
const mongoose = require('mongoose')

const DatabaseSchema = mongoose.Schema({
    userName:{type:String},
    TodoSubject:{type:String},
    TodoDescription:{type:String},
    TodoStatus:{type:String}
},{timestamps:true,versionKey:false})

const TodoModel = mongoose.model('TodoList', DatabaseSchema)
module.exports = TodoModel
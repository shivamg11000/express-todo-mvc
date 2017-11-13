const mongoose = require('mongoose')


//Create a Schema ( blueprint )
const todoSchema = new mongoose.Schema({
    item: String
})

//Create A Model (class which instantiates documents), mongoose automatically makes this todos collection in the database
const Todo = mongoose.model('Todo', todoSchema)


module.exports = Todo

const urlencodedParser = require('body-parser').urlencoded({extended: false})
const mongoose = require('mongoose')
const Todo = require('../models/todo')  // Todo model


mongoose.Promise = global.Promise

// Connect to the database ( hosted on mlab )
mongoose.connect('mongodb://test:test@ds159845.mlab.com:59845/express-todo-mvc-with-database')
mongoose.connection
    .once('open', () => console.log('\x1b[32m%s\x1b[0m', 'mongodb connected'))
    .on('error', err => console.error(err))



module.exports = function(app){


    app.get('/todo', (req, res) => {
        // get data from mongodb collection(todos) and render view(todo.ejs)
        Todo.find({}, (err, data) => {
            if (err) throw err
            res.render('todo', {todos: data})
        })
    })

    app.post('/todo', urlencodedParser, (req, res) => {
        //get data from the view and add it to the database collection(todos)
        new Todo({item: req.body.item}).save((err,data) => {
            if (err)  throw err
            res.json(data)  // data is here the new Todo created
        })
    })

    app.delete('/todo/:item', (req, res) => {
        // delete the requested item from mongodb
        const itemToDelete = req.params.item.replace(/-/g, " ")

        Todo.find({ item: itemToDelete }).remove((err, data) => { // check what is data
            if (err)  throw err
            res.json({item: itemToDelete})
        })
    })

}
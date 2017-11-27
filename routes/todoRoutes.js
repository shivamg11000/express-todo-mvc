
const mongoose = require('mongoose')
const todoRouter = require('express').Router()
const User = require('../models/User')

todoRouter.use(checkAuthorization)

todoRouter.get('/', (req, res) => {

    User.findOne({
        userId: req.cookies.userId
    }, (err, user) => {
        if (err) throw err
        res.render('todo', {todos: user.todos})
    })
})

todoRouter.post('/', (req, res) => {
    
    User.findOne({
        userId: req.cookies.userId
    }, (err, user) => {
        if (err)  throw err
        user.todos.push({item: req.body.item})
        user.save((err ,userSaved) => {
            if (err)  throw err
            res.json({item: req.body.item})
        })
    })

})

todoRouter.delete('/:item', (req, res) => {

    const itemToDelete = req.params.item.replace(/-/g, " ")

    User.findOne({
        userId: req.cookies.userId
    }, (err, user) => {
        if (err)  throw err
        let todos = user.todos
        todos = todos.filter(todo => todo.item!=itemToDelete)
        user.todos = todos
        user.save((err, userSaved) => {
            if (err)  throw err
            res.json({item: itemToDelete})
        })
    })
})
    


function checkAuthorization(req, res, next) {
    if (!req.isAuth) {
        return res.redirect('/login')
    }
    next()
}

module.exports = todoRouter
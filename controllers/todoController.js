
const mongoose = require('mongoose')
const router = require('express').Router()
const User = require('../models/User')


module.exports = function(app){

    app.use('/user/:userId/todos', router)
    
    router.get('/', (req, res) => {
        if(!req.cookies.userId){
            res.redirect('/')
            return 
        }

        User.find({
            userId: req.cookies.userId
        }, (err, data) => {
            if (err) throw err
            res.render('todo', {todos: data[0].todos})
        })
    })

    router.post('/', (req, res) => {
        if(!req.cookies.userId){
            res.redirect('/')
            return 
        }
        
        User.find({
            userId: req.cookies.userId
        }, (err, data) => {
            if (err)  throw err
            data[0].todos.push({item: req.body.item})
            data[0].save((err ,data) => {
                if (err)  throw err
                res.json({item: req.body.item})
            })
        })

    })

    router.delete('/:item', (req, res) => {
        if(!req.cookies.userId){
            res.redirect('/')
            return 
        }

        const itemToDelete = req.params.item.replace(/-/g, " ")

        User.find({
            userId: req.cookies.userId
        }, (err, data) => {
            if (err)  throw err
            const user = data[0]
            let todos = user.todos
            todos = todos.filter(todo => todo.item!=itemToDelete)
            user.todos = todos
            user.save((err, data) => {
                if (err)  throw err
                res.json({item: itemToDelete})
            })
        })
    })
    

}
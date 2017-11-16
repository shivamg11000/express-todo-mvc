const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const todoController = require('./controllers/todoController')
const userController = require('./controllers/userController')


app.set('view engine', 'ejs')


// middlewares
app.use(express.static('public'))
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// connect to database
mongoose.connect('mongodb://test11:test11@ds259855.mlab.com:59855/express-todo-mvc-with-users')
mongoose.connection
    .once('open', () => console.log('\x1b[32m%s\x1b[0m', 'mongodb connected'))
    .on('error', err => console.error(err))
mongoose.Promise = global.Promise


// fire controllers
userController(app)    // handles user
todoController(app)    // handles user todos

// all other routes
app.get('/*', (req, res) => {
    res.redirect('/')
})

app.listen(process.env.PORT || 3000)
console.log('\x1b[32m%s\x1b[0m', 'Server running on http://localhost:3000')

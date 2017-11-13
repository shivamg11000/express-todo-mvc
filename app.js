const express = require('express')
const app = express()

const todoController = require('./controllers/todoController')

// set view/templating engine
app.set('view engine', 'ejs')

// static files
app.use(express.static('public'))

// fire controllers
todoController(app)


app.listen(process.env.PORT || 3000)
console.log('\x1b[32m%s\x1b[0m', 'Server running on http://localhost:3000/todo')

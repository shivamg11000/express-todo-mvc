// for parsing the response body
const urlencodedParser = require('body-parser').urlencoded({extended: false})


// todos
let data = [
    {item: 'get milk'},
    {item: 'walk dog'},
    {item: 'kick some coding ass'}
]

module.exports = function(app){
    // Controller here does all the routing

    app.get('/todo', (req, res) => {
        res.render('todo', {todos: data})
    })

    app.post('/todo', urlencodedParser, (req, res) => {
        data.unshift(req.body)
        res.json(data)
    })

    app.delete('/todo/:item', (req, res) => {
        const item = req.params.item.replace(/-/g, " ")    // replace all '-' with ' '
        data = data.filter(todo => todo.item!=item)
        res.json(data)
    })
}
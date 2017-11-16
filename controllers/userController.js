
const User = require('../models/User')


module.exports = function(app){

    app.get('/', (req, res) => {
        if (req.cookies.userId) {
            res.redirect(`/user/${req.cookies.userId}/todos`)
        } else{
            res.redirect('/login')
        }
    })

    app.get('/login', (req, res) => {
        if (req.cookies.userId){
            res.redirect(`/user/${req.cookies.userId}/todos`)
        } else {
        res.render('login')
        }
    })
    app.post('/login', (req, res) => {
        
        User.find(req.body, (err ,data) => {
            if (err)  throw err
            if (data.length==0){
                res.send('<h3>wrond ID or password</h3><h3>Sign Up for New users</h3>')
                return
            }

            res.cookie('userId', data[0].userId, {maxAge: 3600000})
            res.redirect(`/user/${data[0].userId}/todos`)
        })
    })

    app.get('/signup', (req, res) => {
        if (req.cookies.userId){
            res.redirect(`/user/${req.cookies.userId}/todos`)
        } else {
            res.render('signup')
        }
    })
    app.post('/signup', (req, res) => {
        User.find({
            userId: req.body.userId
        }, (err, data) => {
            if (err)  throw err
            if(data.length!=0){
                res.send('User Id already exist')
            } else {
                new User({
                    userId: req.body.userId,
                    password: req.body.password
                }).save((err, data) => {
                    if (err)  throw err
                    res.cookie('userId', data.userId, {maxAge: 3600000})
                    res.redirect(`/user/${data.userId}/todos`)        
                })
            }


        })
    })

    app.get('/logout', (req, res) => {
        console.log('performed logout')
        res.clearCookie('userId')
        res.redirect('/login')
    })
}
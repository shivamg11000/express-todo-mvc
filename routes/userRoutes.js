const userRouter = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')



userRouter.get( ['/', '/login'] , (req, res) => {
    if (req.isAuth) {
        res.redirect(`/user/${req.cookies.userId}/todos`)
    } else{
        res.render('login')
    }
})

userRouter.post('/login', (req, res) => {
    if (req.isAuth)
        return res.end('user already logined, pls logout first')
    
    User.findOne({
        userId: req.body.userId
    }, async (err ,user) => {
        if (err)  throw err
        if (!user || !await cmpHash(req.body.password, user.password) ){
            res.send('<h3>wrond ID or password</h3><h3>Sign Up for New users</h3>')
            return
        }

        res.cookie('userId', user.userId, {maxAge: 3600000})
        res.redirect(`/user/${user.userId}/todos`)
    })
})

userRouter.get('/signup', (req, res) => {
    if (req.isAuth){
        res.redirect(`/user/${req.cookies.userId}/todos`)
    } else {
        res.render('signup')
    }
})

userRouter.post('/signup', hashPassword, (req, res) => {
    if (req.isAuth)
        return res.end('User logined already, first log out')
    
    User.findOne({
        userId: req.body.userId
    }, (err, user) => {
        if (err)  throw err
        if(!user){
            res.send('User Id already exist')
        } else {
            new User({
                userId: req.body.userId,
                password: req.body.password   //
            }).save((err, savedUser) => {
                if (err)  throw err
                res.cookie('userId', data.userId, {maxAge: 3600000})
                res.redirect(`/user/${data.userId}/todos`)        
            })
        }


    })
})

userRouter.get('/logout', (req, res) => {
    res.clearCookie('userId')
    res.redirect('/login')
})


// hashing password middleware
function hashPassword(req, res, next) {
    bcrypt.hash(req.body.password , 1, (err, hash) => {
        if (err)  throw err
        req.body.password = hash
        next()
    })
}
// compare password to a hash
function cmpHash(password, hash) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hash, (err, res) => {
            if (err)  throw err
            resolve(res)
        })
    })
}

module.exports = userRouter
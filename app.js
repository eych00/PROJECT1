const express = require('express');
const path = require('path'); 
const bodyParser = require('body-parser'); 
const { getConnection } = require('./db/db'); 
const userService = require('./Users_module/service');
const cookieParser = require("cookie-parser");
const { auth } = require('./Users_module/auth')



const app = express(); 
const port = 3000;


app.use(express.static(path.join(__dirname, './LOGIN'))) 
app.use(bodyParser.json()) 
app.use(cookieParser());


app.get('/LOGIN', (req, res) => {
    console.log('accessing route /login, METHOD = GET');
    res.sendFile(path.join(__dirname, '/LOGIN/login.html'));
})

app.post('/LOGIN', async (req, res) => {
    const body = req.body

    if(!body.email || !body.password || !body.email.includes('@') || body.password.length === 0) {
        res.status(400).json({
            error: "Invalid User Information, Please check your input"
        })
        return;
    }

    try {
     
        const { userId, token } = await userService.login(body)
        if(userId && token) {
            res.cookie('token', token, {maxAge: 900000});
            res.status(200).json({
                userId,
                token
            })
        }
    } catch (error) {
        console.log('caught error in controller')
        console.log(error)
        res.status(error.code).json({
            error: error.msg
        })
    }


})

app.get('./LOGIN/SIGNUP', (req, res) => {
    res.sendFile(path.join(__dirname, '/LOGIN/SIGNUP/signup.html'))
})

app.post('/LOGIN/SIGNUP', async (req, res) => {
    try {
        await userService.storeUser(req.body)
    } catch(err) {
        res.status(err.code).json({
            error: err.msg
        })
        return
    }
    
    res.status(200).json({
        message: "user created sucessfully"
    })
})

app.get('/user/:email', (req, res) => {
    const user = userService.getUser(req.params.email)
    res.render('profile', {
        layout: 'profile',
        name: user.name, 
        email: user.email,
        course: user.course,
        address: user.address,
        dob: user.dob,
        bio: user.bio,
    })
})

app.get('/dashboard', auth, async (req, res) => {
    try {
        const user = await userService.getUserById(req.userId)
        res.render('dashboard', {
            layout: 'profile',
            name: user.name, 
            email: user.email,
            course: user.course,
            address: user.address,
            dob: user.dob,
            bio: user.bio,
        })
    } catch(error) {
        res.redirect('/LOGIN')
        res.end()
        return
    }

})



app.listen(port, async () => {
    console.log('Listening on port: ' + port);
    await getConnection()
    console.log('connected to DB')
})


module.exports = app;
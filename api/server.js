const express = require('express')
const cookieParser = require('cookie-parser')

const app = express()

app.use(cookieParser())
app.set('view engine', 'pug')
app.set('port', process.env.PORT || 3000)

const listCookies = c => Object.keys(c).map(x => ({ key: x, value: c[x] }))

app.get('/', function (req, res) {
    res.render('index',
        {
            title: 'Hey',
            message: 'Hello there!',
            cookies: listCookies(req.cookies)
        }
    )
})

app.get('/setCookie', function (req, res) {
    res.cookie("appCookie", "HelloWorld", { expires: new Date(Date.now() + 100000), httpOnly: true })
    res.send('Setting cookie!')
})

app.get('/setCookie2', function (req, res) {
    res.cookie("appCookie2", "HelloWorld2", { expires: new Date(Date.now() + 100000), httpOnly: true })
    res.send('Setting cookie 2!')
})

app.get('/deleteCookie', function (req, res) {
    res.cookie("appCookie", "", { expires: new Date(Date.now() - 900000), httpOnly: true })
    res.send('Cookie deleted!')
})

app.listen(app.get('port'), function () {
    console.log('Example app listening on port 3000!')
})

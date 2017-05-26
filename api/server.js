const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const app = express()

app.use(express.static('public'))
app.use(cookieParser())
app.disable('etag')
app.set('view engine', 'pug')
app.set('port', process.env.PORT || 3000)

const listCookies = c => Object.keys(c).map(x => ({ key: x, value: c[x] }))
const urlEncodedParser = bodyParser.urlencoded({ extended: false })

app.get('/', function (req, res) {
    res.render('index',
        {
            title: 'Hey',
            message: 'Hello there!',
            cookies: listCookies(req.cookies)
        }
    )
})

app.get('/data', function (req, res) {
    res.status(200).send( 
    {
        data: {
            title: 'Jump the shark',
            character: 'Fonz',
            show: 'Happy Days',
            cookies_spotted_at_server: req.cookies
        }
    })
})

app.get('/setCookie', function (req, res) {
    res.cookie("setCookie", "Cookie is set", { expires: new Date(Date.now() + 600000), httpOnly: false })
    res.redirect('/')
})

app.get('/setHttpCookie', function (req, res) {
    res.cookie("setHttpOnlyCookie", "Cookie is set httpOnly", { expires: new Date(Date.now() + 600000), httpOnly: true })
    res.redirect('/')
})

app.get('/deleteCookie', function (req, res) {
    res.cookie("setCookie", "", { expires: new Date(Date.now() - 900000), httpOnly: false })
    res.redirect('/')
})

app.get('/deleteHttpCookie', function (req, res) {
    res.cookie("setHttpOnlyCookie", "", { expires: new Date(Date.now() - 900000), httpOnly: true })
    res.redirect('/')
})

app.post('/addCookie', urlEncodedParser, function (req, res) {
    if (!req.body) return res.sendStatus(400)
    if (!req.body.key || !req.body.value) return res.sendStatus(400)
    let httpOnly = req.body.httpOnly === "on" ? true : false

    res.cookie(req.body.key, req.body.value, { expires: new Date(Date.now() + 600000), httpOnly: httpOnly })
    res.redirect('/')
})

app.listen(app.get('port'), function () {
    console.log('Example app listening on port 3000!')
})

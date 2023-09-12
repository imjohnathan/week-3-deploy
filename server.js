const express = require('express');
const cookieParser = require('cookie-parser')
const app = new express();
const runngPort = 3003

// set the view engine
app.set('view engine', 'pug');
// set the cookieParser middleware
app.use(cookieParser())

// Assignment 3: Connect to Backend API by AJAX
// serve the static file under the "public" folder
app.use(express.static('public'))

// Assignment 1: Your First Web Server
app.get('/', (req, res) => {
    res.send('Hello, My Server!')
})

// Assignment 2: Build Backend API for Front-End
app.get('/getData', (req, res) => {
    //get the number from the request query
    const { number } = req.query
    //if number have value
    if (number) {
        //first use "+" to convert the number query to a real number, if it is not a number it will output "NaN" and use isNaN to check. Since we need positive int so get rid of negative int
        if (!isNaN(+number) && +number > 0) {
            //c. show "55" when a user enters "10"
            if (+number === 10) return res.send('55')
            //1+2+....+ POSITIVE_INTEGER in the page.
            return res.send(`1+2+...+${number}`)
        } else {
            // if the number not correct, give http a error code 400
            return res.status(400).send("Wrong Parameter")
        }
    }
    //no parameter, give http a error code 400
    res.status(400).send('Lack of Parameter')
})

// Assignment 5: HTTP Cookie (Advanced Optional)

app.get('/myName', (req, res) => {

    //get the cookie from the request
    const { name } = req.cookies

    //additional clear the cookie
    if (req.query.hasOwnProperty('goodbye')) {
        res.clearCookie('name')
        return res.redirect('/myName')
    }
    //render the view "views/name.pug"
    res.render('name', { name })
})

//the route store the name to cookie
app.get('/trackName', (req, res) => {
    //get the "name" from the url query
    const { name } = req.query
    //if name query have a value, set the cookie
    if (name) res.cookie('name', name)

    //all done, redirect to /myName
    res.redirect('/myName')
})



app.listen(runngPort, () => {
    console.log(`The week 3 assignment is running at  http://localhost:${runngPort}`)
})

const express = require('express')

var app = express()

var cors = require('cors')
const basicAuth = require('./index.js')

//Requires basic auth with username 'Admin' and password 'secret1234'
var staticUserAuth = basicAuth({
    users: {
        'Admin': 'secret1234'
    },
    challenge: false
})

factText = ["",
"The first tractors to hit the market near the turn of the 20th century were hulking masses of steel. These monstrous machines weighing between 40,000 and 60,000 pounds were powered by steam engines.",
"As gas-powered tractors dropped in price, farmers moved away from horse-drawn equipment. The Ford name and low price made the Fordson tractor number one in 1923. Seventy-five percent of tractors purchased in 1923 were Fordsons. Ford's unwillingness to update the tractor led to the Fordson's failure in 1928",
"Cheap tractors in the late 1920s helped launch an agricultural revolution. The kerosene-burning John Deere Model D tractor was introduced in 1923 and became the first tractor built.",
"The British Agricultural Revolution, or Second Agricultural Revolution, was an unprecedented increase in agricultural production. Agricultural output grew faster than the population over the hundred-year period ending in 1770. This increase in the food supply contributed to the rapid growth of population in England and Wales, from 5.5 million in 1700 to over 9 million by 1801."]



app.use(cors())
app.use('/', express.static('public'))


app.get('/', function(req, res) {    
    res.status(200).send(`Welcome to Tract-Fact Content Manager System<br/>
    Click here to get a random <a href="/public/fact">fact</a>`)
})


app.get('/private/*', staticUserAuth, function(req, res, next) {
    console.log("basic auth called...")
    next()
})


app.get('/private/', function(req, res, next) {
    console.log("auth homecalled...")
    res.write(`<html>
    <body>
    <a href='/public/fact'>/public/fact</a><br/>
    <a href="/private/flag">/private/flag</a>
    </body>
    </html>`)
    res.status(200).end()
})

app.get('/private/flag', function(req, res, next) {
    res.write(`<html>
    <body>
    <p>FLAG-CLIENTSIDESECRETS-FLAG<p/>
    </body>
    </html>`)
    res.status(200).end()
})




app.get('/public/', function(req, res, next) {
    console.log("fact page called...")
    res.write((`<html>
    <body>
    <a href='/public/fact'>/public/fact</a><br/>
    </body>
    </html>`))
    res.status(200).end()
})

app.get('/public/fact', function(req, res, next) {
    randomFact = parseInt(Math.random() * 4) + 1

    res.write(`<html>
    <body>
    <div>
    <p>
    ${ factText[randomFact] }
    </p>
    <img src="/${ randomFact }.png" />
    </div>
    </body>
    </html>`)
    res.status(200).end()
})




app.listen(8081, function() {
    console.log("Listening! http://localhost:8081")
})

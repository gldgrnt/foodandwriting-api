const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const mountRoutes = require('./routes')

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

// Routes
app.get('/', (req, res) => { res.json({ info: "Food and Writing API" }) })
mountRoutes(app)


// Listeners
app.listen(port, () => {
    console.log(`App is running on port ${port}`)
})
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const mountRoutes = require('./routes')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

// Routes
app.get('/', (req, res) => { res.json({ info: "Food and Writing API" }) })
mountRoutes(app)


// Listeners
app.listen(process.env.PORT || 3000, () => {
    console.log(`Server listening`)
})
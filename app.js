const express = require('express')
const cors = require('cors');
const bodyparser = require('body-parser')
const morgan = require('morgan')


// files
const v1Routes = require('./api/routes')
const db = require('./db')
const { dbURI } = require('./environment')

// connect mongoDB'
db(dbURI);


const app = express()
app.use(cors())
app.use(morgan('dev'))
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: false }))


app.use('/api/v1', v1Routes)

module.exports = app
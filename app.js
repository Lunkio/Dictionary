require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const dataRouter = require('./controllers/datas')
const dictionaryRouter = require('./controllers/dictionaries')
const middleware = require('./utils/middleware')

let MONGODB_URI = process.env.MONGODB_URI

if (process.env.NODE_ENV === 'development') {
    MONGODB_URI = process.env.TEST_MONGODB_URI
}

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(result => {
        console.log('Connected to MongoDB')
    })
    .catch((error) => {
        console.log('error', error.message)
    })

app.use(cors())
app.use(bodyParser.json())

app.use(express.static('build'))
app.use('/dataset', express.static('build'))
app.use('/create', express.static('build'))
app.use('/available', express.static('build'))
app.use('/edit', express.static('build'))
app.use('/apply', express.static('build'))

app.use('/api/data', dataRouter)
app.use('/api/dictionary', dictionaryRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
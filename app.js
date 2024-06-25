
const config = require('./utils/config')
const express = require('express')
const cors = require('cors')
require('express-async-errors')
const workoutRouter = require('./controllers/workouts')
const userRouter = require('./controllers/users')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)
const url = config.MONGODB_URI
console.log('connecting to', url)

mongoose
.connect(url)
.then(result => {
    console.log('connected to MongoDB')
    })
    .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
    })

const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static('dist'))

app.use('/api/exercises', workoutRouter)
app.use('/api/users', userRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
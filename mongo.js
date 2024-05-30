require('dotenv').config()
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)
const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose
.connect(url)
.then(result => {
    console.log('connected to MongoDB')
    })
    .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
    })

const exerciseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }, 
    repetitions: {
        type: String,
        required: true,
    }
})

exerciseSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

//model.exports = mongoose.model('Exercise', exerciseSchema)
const Exercise = mongoose.model('Exercise', exerciseSchema)

const exercise = new Exercise({
    name: "Squats",
    repetitions: "15"
})

exercise.save().then(result => {
    console.log('exercise saved!')
    mongoose.connection.close() // otherwise the program won't finish
  })
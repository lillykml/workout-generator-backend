const mongoose = require('mongoose')

const workoutSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }, 
    exercises: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Exercise'
        }
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exercise',
        required: true
    }
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

module.exports = mongoose.model('Workout', workoutSchema)
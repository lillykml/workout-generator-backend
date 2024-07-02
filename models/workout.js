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
        ref: 'User',
        required: true
    }
})

workoutSchema.set('toJSON', {
  transform: (document, returnedObject) => {
      if (returnedObject._id) {
          returnedObject.id = returnedObject._id.toString();
      }
      delete returnedObject._id;
      delete returnedObject.__v;
  }
})

module.exports = mongoose.model('Workout', workoutSchema)
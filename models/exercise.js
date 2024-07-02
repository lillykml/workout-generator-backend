const mongoose = require('mongoose')

const exerciseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }, 
    repetitions: {
        type: String,
        required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['upper body', 'lower body', 'abs', 'full body'],
    }
})

exerciseSchema.set('toJSON', {
  transform: (document, returnedObject) => {
      if (returnedObject._id) {
          returnedObject.id = returnedObject._id.toString();
      }
      delete returnedObject._id;
      delete returnedObject.__v;
  }
})

module.exports = mongoose.model('Exercise', exerciseSchema)
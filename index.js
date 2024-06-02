require('dotenv').config()
const express = require('express')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static('dist'))

const Exercise = require('./models/workout')

// Routes
app.get("/", (req, res, next) => {
    res.json({
        message: 'Access endpoint /api/exercises to display available exercises'
    })
    .catch(error => next(error))
})

app.get("/api/exercises", (req, res, next) => {
  Exercise.find({})
  .then(exercise => res.json(exercise))
  .catch(error => next(error))
})

app.get("/api/exercises/:id", (req,res, next) => {
  Exercise.findById(req.params.id)
  .then(exercise => {
    if (exercise) {
      res.json(exercise)
    } else {
      res.status(404).end()
    }
  })
  .catch(error => next(error))
})

app.delete("/api/exercises/:id", (req,res, next) => {
  Exercise.findByIdAndDelete(req.params.id)
  .then(result => {
    res.status(204).end()
  })
  .catch(error => next(error))
})

app.post("/api/exercises", (req, res, next) => {
  const newExercise = new Exercise({
      name: req.body.name,
      repetitions: req.body.repetitions,
  })
  newExercise
  .save()
  .then(exercise => {
    res.json(exercise)
  })
  .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(404).send({error: 'Missing Exercise Name or Repetitions'})  
  }
  next(error)
}
  
app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})
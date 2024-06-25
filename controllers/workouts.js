const workoutRouter = require('express').Router()
const Exercise = require('../models/workout')


workoutRouter.get("/", (req, res, next) => {
  Exercise.find({})
  .then(exercise => res.json(exercise))
  .catch(error => next(error))
})

workoutRouter.get("/:id", (req,res, next) => {
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

workoutRouter.delete("/:id", (req,res, next) => {
  Exercise.findByIdAndDelete(req.params.id)
  .then(result => {
    res.status(204).end()
  })
  .catch(error => next(error))
})

workoutRouter.post("/", (req, res, next) => {
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

module.exports = workoutRouter
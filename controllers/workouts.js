const workoutRouter = require('express').Router()
const Exercise = require('../models/workout')


workoutRouter.get("/", async (req, res) => {
  const exercises = await Exercise.find({})
  res.json(exercises)
})

workoutRouter.get("/:id", async (req, res) => {
  const exercise = await Exercise.findById(req.params.id)
  if (exercise) {
      res.json(exercise)
  } else {
      res.status(404).end()
  }
})

workoutRouter.delete("/:id", async (req, res) => {
  await Exercise.findByIdAndDelete(req.params.id)
  res.status(204).end()
})

workoutRouter.delete("/", async(req, res) => {
  await Exercise.findOneAndDelete()
  res.status(204).end()
})

workoutRouter.post("/", async (req, res) => {
  const newExercise = new Exercise({
      name: req.body.name,
      repetitions: req.body.repetitions,
      category: req.body.category
  })
  const savedExercise = await newExercise.save()
  res.json(savedExercise)
})

module.exports = workoutRouter
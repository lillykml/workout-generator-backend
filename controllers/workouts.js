const workoutRouter = require('express').Router()
const Workout = require('../models/workout')

workoutRouter.get('/', async(request, response) => {
    const workouts = await Workout.find({}).populate('exercises', {name: 1, repetitions: 1, category: 1})
    response.json(workouts)
})

workoutRouter.get('/:id', async(request, response) => {
    const workout = await Workout.findById(request.params.id)
    if (workout)
        response.json(workout)
    else
        response.status(404).end()
})

workoutRouter.delete("/:id", async (request, response) => {
    await Workout.findByIdAndDelete(request.params.id)
    response.status(204).end()
  })

workoutRouter.post('/', async(request, response) => {
    const newWorkout = new Workout({
        name: request.body.name,
        exercises: request.body.exercises,
        user: request.body.user
    })

    const savedWorkout = await newWorkout.save()
    response.status(201).json(savedWorkout)
})

module.exports = workoutRouter
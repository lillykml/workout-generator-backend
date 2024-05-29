const express = require('express')
const app = express()

let exercises = [
    {
      "id": "1",
      "name": "Squats",
      "repetitions": "15"
    },
    {
      "id": "2",
      "name": "Lunges",
      "repetitions": "15"
    },
    {
      "id": "3",
      "name": "Sprint",
      "repetitions": "400m"
    },
    {
      "id": "4",
      "name": "Row",
      "repetitions": "1km"
    },
    {
      "id": "c23a",
      "name": "Sumo Squats",
      "repetitions": "15"
    },
    {
      "id": "14ce",
      "name": "Jump Rope",
      "repetitions": "5 Minutes"
    },
    {
      "id": "9c5b",
      "name": "Wallballs",
      "repetitions": "30"
    },
    {
      "id": "b1df",
      "name": "Push Ups",
      "repetitions": "10"
    },
    {
      "id": "ab44",
      "name": "Plank",
      "repetitions": "50 seconds"
    }
  ]

app.get("/", (req, res) => {
    res.json({
        message: 'Access endpoint /api/exercises to display available exercises'
    })
})

app.get("/api/exercises", (req, res) => {
    res.json(exercises)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})

app.get("/api/exercises/:id", (req,res) => {
    const id = req.params.id
    const exercise = exercises.find(e => e.id === id)
    if (exercise) {
        res.json(exercise)
    } else {
        res.status(404).end()
    }
})

app.delete("/api/exercises/:id", (req,res) => {
    const id = req.params.id
    exercises = exercises.filter(e => e.id !== id)
    res.status(204).end()
})
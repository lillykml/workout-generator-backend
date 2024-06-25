const bcrypt = require('bcrypt')
const User = require('../models/user')
const userRouter = require('express').Router()

userRouter.get('/', async (request, response) => {
    const users = await User.find({})
    return response.json(users)
})

userRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body
    const passwordHash = await bcrypt.hash(password, 10)

    const user = new User({
        name, 
        username,
        passwordHash
    })

    const savedUser = await user.save()
    response.status(201).json(savedUser)
})

module.exports = userRouter
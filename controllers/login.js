const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
    const { username, password } = request.body
    const user = await User.findOne({ username })
    const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

    if (!(user && passwordCorrect)) {
        return response.status(401).json({
          error: 'invalid username or password'
        })
    }

    return response.status(200).json(user)
})

module.exports = loginRouter
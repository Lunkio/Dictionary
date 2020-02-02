const cypressRouter = require('express').Router()
const Dictionary = require('../models/dictionaryModel')

cypressRouter.post('/reset', async (req, res) => {
    await Dictionary.deleteMany({})

    res.status(204).end()
})

module.exports = cypressRouter
const dictionaryRouter = require('express').Router()
const Dictionary = require('../models/dictionaryModel')

dictionaryRouter.get('/', async (req, res) => {
    const dictionaries = await Dictionary.find({})
    res.json(dictionaries.map(d => d.toJSON()))
})

dictionaryRouter.post('/', async (req, res, next) => {
    const body = req.body
    //console.log('body', body)
    try {
        const dictionary = new Dictionary({
            name: body.name,
            description: body.description,
            valueSets: body.valueSets
        })
    
        const savedDictionary = await dictionary.save()
        res.json(savedDictionary.toJSON())

    } catch(exception) {
        next(exception)
    }
})

dictionaryRouter.put('/:id', async (req, res, next) => {
    const body = req.body

    try {
        const dictionary = {
            name: body.name,
            description: body.description,
            valueSets: body.valueSets
        }
    
        const modifiedDictionary = await Dictionary.findByIdAndUpdate(req.params.id, dictionary, { new: true })
        res.json(modifiedDictionary.toJSON())

    } catch(exception) {
        next(exception)
    }
})

dictionaryRouter.delete('/:id', async (req, res, next) => {
    try {
        await Dictionary.findByIdAndRemove(req.params.id)
        res.status(204).end()

    } catch(exception) {
        next(exception)
    }
})

module.exports = dictionaryRouter
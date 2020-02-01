const mongoose = require('mongoose')

const dictionarySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    valueSets: []
})

dictionarySchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Dictionary = mongoose.model('Dictionary', dictionarySchema)

module.exports = Dictionary
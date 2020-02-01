const mongoose = require('mongoose')

const dataSchema = new mongoose.Schema({
    product: String,
    color: String,
    price: String
})

dataSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Data = mongoose.model('Data', dataSchema)

module.exports = Data
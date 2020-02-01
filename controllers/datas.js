const dataRouter = require('express').Router()
const Data = require('../models/dataModel')

dataRouter.get('/', async (req, res) => {
    const datas = await Data.find({})
    res.json(datas.map(data => data.toJSON()))
})

dataRouter.post('/', async (req, res) => {
    const body = req.body

    const data = new Data({
        product: body.product,
        color: body.color,
        price: body.price
    })

    const savedData = await data.save()
    res.json(savedData.toJSON())
})

dataRouter.delete('/:id', async (req, res) => {
    await Data.findByIdAndRemove(req.params.id)
    res.status(204).end()
})

module.exports = dataRouter
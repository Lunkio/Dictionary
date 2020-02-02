const Dictionary = require('../models/dictionaryModel')

const testDictionaries = [
    {
        name: "Dictionary 1",
        description: "None",
        valueSets: [["A", "B"]]
    },
    {
        name: "Dictionary 2",
        description: "None",
        valueSets: [["B", "C"], ["D", "E"]]
    },
    {
        name: "Dictionary 3",
        description: "None",
        valueSets: [["B", "C"], ["D", "E"], ["A", "F"]]
    }    
]

const dictionariesInDb = async () => {
    const dictionaries = await Dictionary.find({})
    return dictionaries.map(d => d.toJSON())
}

module.exports = {
    testDictionaries,
    dictionariesInDb
}
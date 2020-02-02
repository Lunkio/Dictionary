const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Dictionary = require('../models/dictionaryModel')
const helper = require('./test_helper')
const api = supertest(app)

describe('api tests, some dictionaries in db', () => {
    beforeEach(async () => {
        await Dictionary.deleteMany({})
        for (let i = 0; i < helper.testDictionaries.length; i++) {
            let newDictionary = new Dictionary(helper.testDictionaries[i])
            await newDictionary.save()
        }
    })

    describe('get-method', () => {
        it('dictionaries are returned as json', async () => {
            await api
                .get('/api/dictionary')
                .expect(200)
                .expect('Content-Type', /application\/json/)
        })

        it('all dictionaries are returned', async () => {
            const res = await api.get('/api/dictionary')
            expect(res.body.length).toBe(helper.testDictionaries.length)
        })

        it('specific dictionary is in returned dictionaries', async () => {
            const res = await api.get('/api/dictionary')
            const dictionaries = res.body.map(d => d.name)
            expect(dictionaries).toContain('Dictionary 1')
        })
    })

    describe('post-method', () => {
        it('valid dictionary can be added', async () => {
            const testDictionary = {
                name: 'Valid',
                description: 'None',
                valueSets: [["A", "B"]]
            }

            await api
                .post('/api/dictionary')
                .send(testDictionary)
                .expect(200)
                .expect('Content-Type', /application\/json/)

            const res = await api.get('/api/dictionary')
            expect(res.body.length).toBe(helper.testDictionaries.length +1)
        })

        it('not-valid dictionary is not added', async () => {
            const testDictionary = {
                name: '',
                description: '',
                valueSets: ''
            }

            await api
                .post('/api/dictionary')
                .send(testDictionary)
                .expect(400)

            const dictionaries = await helper.dictionariesInDb()
            expect(dictionaries.length).toBe(helper.testDictionaries.length)
        })
    })

    describe('put-method', () => {
        it('dictionary can be modified', async () => {
            const dictionariesBefore = await helper.dictionariesInDb()
            const dictionaryToModify = dictionariesBefore[0]

            dictionaryToModify.name = 'Modified'

            await api
                .put(`/api/dictionary/${dictionaryToModify.id}`)
                .send(dictionaryToModify)
                .expect(200)

            const dictionariesAfter = await helper.dictionariesInDb()
            const names = dictionariesAfter.map(d => d.name)
            expect(names).toContain('Modified')
        })
    })

    describe('delete-method', () => {
        it('dictionary can be deleted', async () => {
            const dictionariesBefore = await helper.dictionariesInDb()
            const dictionaryToDelete = dictionariesBefore[0]
    
            await api
                .delete(`/api/dictionary/${dictionaryToDelete.id}`)
                .expect(204)
    
            const dictionariesAfter = await helper.dictionariesInDb()
            expect(dictionariesAfter.length).toBe(helper.testDictionaries.length -1)
    
            const names = dictionariesAfter.map(d => d.name)
            expect(names).not.toContain(dictionaryToDelete.name)
        })
    })
})

afterAll(() => {
    mongoose.connection.close()
})
import axios from 'axios'

const dataUrl = '/api/data'
const dictionaryUrl = '/api/dictionary'

const getAllData = async () => {
    const response = await axios.get(dataUrl)
    return response.data
}

const getAllDictionary = async () => {
    const response = await axios.get(dictionaryUrl)
    return response.data
}

const postDictionary = async (dictionary) => {
    const response = await axios.post(dictionaryUrl, dictionary)
    return response.data
}

const putDictionary = async (id, dictionary) => {
    const response = await axios.put(`${dictionaryUrl}/${id}`, dictionary)
    return response.data
}

const deleteDictionary = async (id) => {
    const response = await axios.delete(`${dictionaryUrl}/${id}`)
    return response.data
}

export default { getAllData, getAllDictionary, postDictionary, putDictionary, deleteDictionary }
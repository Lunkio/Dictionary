const dictionaryReducer = (state = [], action) => {
    switch(action.type) {
        case 'INIT_DICTIONARY':
            return action.data
        case 'ADD_DICTIONARY':
            return [...state, action.data]
        case 'UPDATE':
            const updatedDictionary = action.data
            const id = action.data.id            
            return state.map(dictionary => dictionary.id !== id ? dictionary : updatedDictionary)
        case 'DELETE_DICTIONARY':
            const dictionaryToDelete = state.find(d => d.id === action.data.id)
            return state.filter(d => d.id !== dictionaryToDelete.id)
        default: return state
    }
}

export const initDictionaries = (dictionaries) => {
    return {
        type: 'INIT_DICTIONARY',
        data: dictionaries
    }
}

export const addDictionary = (dictionary) => {
    return {
        type: 'ADD_DICTIONARY',
        data: dictionary
    }
}

export const updatedDictionary = (dictionary) => {
    return {
        type: 'UPDATE',
        data: dictionary
    }
}

export const deleteDictionary = (dictionary) => {
    return {
        type: 'DELETE_DICTIONARY',
        data: dictionary
    }
}

export default dictionaryReducer
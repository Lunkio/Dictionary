const editReducer = (state = [], action) => {
    switch(action.type) {
        case 'SET_EDIT':
            return action.data
        case 'UPDATE_EDIT':
            return action.data
        case 'CANCEL':
            return [...[]]
        default: return state
    }
}

export const editDictionary = (dictionary) => {
    return {
        type: 'SET_EDIT',
        data: dictionary
    }
}

export const updatedEditDictionary = (dictionary) => {
    return {
        type: 'UPDATE_EDIT',
        data: dictionary
    }
}

export const cancelEdit = () => {
    return {
        type: 'CANCEL',
        data: []
    }
}

export default editReducer
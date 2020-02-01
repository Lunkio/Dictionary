const dataReducer = (state = [], action) => {
    switch(action.type) {
        case 'INITDATA':
            return action.data
        case 'ADD_DATA':
            return [...state, action.data]
        case 'EDIT_DATA':
            const newState = JSON.parse(JSON.stringify(state))
            for (let i = 0; i < action.data.length; i++) {
                for (let j = 0; j < newState.length; j++) {
                    if (action.data[i][0] === newState[j].color) {
                        newState[j].color = action.data[i][1]
                    }
                }
            }
            return newState
        default: return state
    }
}

export const initData = (data) => {
    return {
        type: 'INITDATA',
        data: data
    }
}

export const addData = (data) => {
    return {
        type: 'ADD_DATA',
        data: data
    }
}

export const editData = (valueSet) => {
    return {
        type: 'EDIT_DATA',
        data: valueSet
    }
}

export default dataReducer
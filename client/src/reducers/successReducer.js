const successReducer = (state = '', action) => {
    switch(action.type) {
        case 'NEW_SUCCESS':
            return action.data
        case 'HIDE_SUCCESS':
            return state = ''
        default: return state
    }
}

export const setSuccess = (content, duration) => {
    return dispatch => {
        dispatch({
            type: 'NEW_SUCCESS',
            data: content
        })
        setTimeout(() => {
            dispatch({
                type: 'HIDE_SUCCESS'
            })
        }, duration * 1000)
    }
}

export default successReducer
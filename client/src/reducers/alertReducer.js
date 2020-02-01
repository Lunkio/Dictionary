const alertReducer = (state = '', action) => {
    switch(action.type) {
        case 'NEW_ALERT':
            return action.data
        case 'HIDE_ALERT':
            return state = ''
        default: return state
    }
}

export const setAlert = (content, duration) => {
    return dispatch => {
        dispatch({
            type: 'NEW_ALERT',
            data: content
        })
        setTimeout(() => {
            dispatch({
                type: 'HIDE_ALERT'
            })
        }, duration * 1000)
    }
}

export default alertReducer
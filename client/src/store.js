import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import dataReducer from './reducers/dataReducer'
import dictionaryReducer from './reducers/dictionaryReducer'
import editReducer from './reducers/editReducer'
import alertReducer from './reducers/alertReducer'
import successReducer from './reducers/successReducer'

const reducers = combineReducers({
    datas: dataReducer,
    dictionaries: dictionaryReducer,
    editDictionary: editReducer,
    alert: alertReducer,
    success: successReducer
})

const store = createStore(reducers, applyMiddleware(thunk))

export default store
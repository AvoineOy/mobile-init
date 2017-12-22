import { combineReducers } from 'redux'
import login from './login'
import me from './me'

const reducers = combineReducers({ login, me })

export default reducers
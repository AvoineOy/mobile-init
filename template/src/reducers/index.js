import { AsyncStorage } from 'react-native'
import { consoleLogger } from '../middleware'
import { combineReducers, applyMiddleware, createStore } from 'redux'
import login from './login'
import _ from 'lodash'

let avoineApp = combineReducers({ login })

const defaultState = {
  login: {
    access_token: undefined
  }
}

let store = createStore(avoineApp, defaultState, applyMiddleware(consoleLogger))

console.log('Store inited with', store.getState())

const handleChange = () => {
  console.log('Subscribe doing it\'s thing');
}

let unsubscribe = store.subscribe(handleChange);

export default store
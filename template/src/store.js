import { AsyncStorage } from 'react-native'
import { consoleLogger } from './middleware'
import { combineReducers, applyMiddleware, createStore } from 'redux'
import reducers from './reducers'
import _ from 'lodash'

export const defaultState = {
  login: {
    access_token: undefined
  }
}

let store = createStore(reducers, defaultState, applyMiddleware(consoleLogger))

console.log('Store inited with', store.getState())

const handleChange = () => {
  console.log('Subscribe doing it\'s thing');
}

let unsubscribe = store.subscribe(handleChange);

export default store
import appConfig from '../appConfig'
import { AsyncStorage } from 'react-native';
import { defaultState } from './store'

export const getStorageKey = (key) => appConfig.storage + ':' + key;

export const saveSession = async (session) => {
  const string = JSON.stringify(session)
  return AsyncStorage.setItem(getStorageKey('session'), string)
}

export const getSession = () => {
  return AsyncStorage.getItem(getStorageKey('session'))
    .then(data => new Promise((resolve, reject) => {
      const obj = JSON.parse(data);
      
      if (obj) {
        resolve(obj);
      } else {
        resolve(defaultState);
      }
    }))
}

export const clearSession = () => {
  return AsyncStorage.removeItem(getStorageKey('session'))
}

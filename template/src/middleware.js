import { saveSession } from './session'

export const consoleLogger = store => next => action => {
  console.log('dispatching', action);
  let result = next(action);
  console.log('next state', store.getState());
  saveSession(store.getState())
  return result;
}
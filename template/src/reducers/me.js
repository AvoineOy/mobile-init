import expect from 'expect';
import * as actions from '../actions'

export const defaultState = {
  data: undefined,
  updated: undefined,
}

const myState = (state = defaultState, action) => {
  
  switch (action.type) {
  case actions.UPDATE_ME:
    const {type, ...obj} = action
    return {
      ...state,
      ...obj
    }
  default:
    return state
  }
}

const before = { data: undefined }
const after = {
  data: {
    'FirstName': 'John',
    'LastName': 'Doe'
  },
  updated: 123456789
}

expect(
  myState(
    { data: undefined },
    {
      type: actions.UPDATE_ME,
      data: {
        'FirstName': 'John',
        'LastName': 'Doe'
      },
      updated: 123456789
    }
  )
).toEqual(after);

expect(
  myState(undefined, { type: undefined })
).toEqual(defaultState);

export default myState
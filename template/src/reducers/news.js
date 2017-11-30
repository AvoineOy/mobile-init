import expect from 'expect';

export const defaultState = {
  access_token: undefined
}

const loginState = (state = defaultState, action) => {
  
  switch (action.type) {
  case 'LOGIN':
    return {
      ...state,
      access_token: action.access_token
    }
  case 'LOGOUT':
    return {
      ...state,
      access_token: undefined
    }
  default:
    return state
  }
}

const before = { access_token: undefined }
const after = { access_token: 'abc' }

expect(
  loginState(
    { access_token: undefined },
    { type: 'LOGIN', access_token: 'abc'}
  )
).toEqual({ access_token: 'abc' });

expect(
  loginState(
    { access_token: undefined },
    { type: 'LOGOUT' }
  )
).toEqual({ access_token: undefined });

expect(
  loginState(undefined, { type: undefined })
).toEqual(defaultState);

export default loginState
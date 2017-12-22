export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'
export const UPDATE_ME = 'UPDATE_ME'


export const login = access_token => {
  return {
    type: LOGIN,
    access_token
  }
}

export const logout = () => {
  return {
    type: LOGOUT
  }
}

export const updateMe = obj => {
  return {
    type: UPDATE_ME,
    ...obj
  }
}
export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'
export const UPDATE_NEWS = 'UPDATE_NEWS'


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

export const updateNews = obj => {
  return {
    type: UPDATE_NEWS,
    ...obj
  }
}
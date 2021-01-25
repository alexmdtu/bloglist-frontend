const initialState = {
  username: '',
  password: '',
  user: null
}

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { user: action.user, ...state }
    case 'SET_PASSWORD':
      return { password: action.password, ...state }
    case 'SET_USERNAME':
      return { username: action.username, ...state }
    default:
      return state
  }
}

export const setUser = (user) => {
  return dispatch => {
    dispatch({
      type: 'SET_USER',
      user
    })
  }
}

export const setUsername = (username) => {
  return dispatch => {
    dispatch({
      type: 'SET_USERNAME',
      username
    })
  }
}

export const setPassword = (password) => {
  return dispatch => {
    dispatch({
      type: 'SET_PASSWORD',
      password
    })
  }
}

export default loginReducer
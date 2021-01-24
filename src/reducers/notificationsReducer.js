const initialState = { message: null, isError: false }

let timeoutID = null

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NOTIFICATION':
      return { message: action.message, isError: action.isError }
    case 'CLEAR':
      return initialState
    default:
      return state
  }
}

export const setNotification = (message, time, isError) => {
  return dispatch => {
    dispatch({
      type: 'NOTIFICATION',
      message,
      isError
    })

    if (timeoutID) {
      clearTimeout(timeoutID)
    }

    timeoutID = setTimeout(() => {
      dispatch({
        type: 'CLEAR'
      })
    }, time * 1000)
  }
}

export default notificationReducer
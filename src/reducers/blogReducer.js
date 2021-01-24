const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_BLOGS':
      return action.blogs
    default:
      return state
  }
}

export const setBlogs = (blogs) => {
  return dispatch => {
    dispatch({
      type: 'SET_BLOGS',
      blogs
    })
  }
}

export default blogReducer
/* eslint-disable indent */
const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_BLOGS':
      return action.blogs
    case 'CREATE_BLOG':
      return state.concat(action.blog)
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

export const createBlog = (blog) => {
  return dispatch => {
    dispatch({
      type: 'CREATE_BLOG',
      blog
    })
  }
}

export default blogReducer
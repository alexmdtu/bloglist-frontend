import blogService from '../services/blogs'
import { setNotification } from './notificationsReducer'

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_BLOGS':
      return action.blogs
    case 'NEW_BLOG':
      return [...state, action.newBlog]
    default:
      return state
  }
}

export const getBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'GET_BLOGS',
      blogs
    })
  }
}

export const createBlog = (blogObject) => {
  return async dispatch => {
    try {
      const newBlog = await blogService.create(blogObject)
      dispatch({
        type: 'NEW_BLOG',
        newBlog
      })
      dispatch(getBlogs())
      dispatch(setNotification(`a new blog ${blogObject.title} by ${blogObject.author} added`, 5, false))
    } catch (error) {
      dispatch(setNotification('Error when trying to add a new blog. Please fill out all fields.', 5, true))
    }
  }
}

export default blogReducer
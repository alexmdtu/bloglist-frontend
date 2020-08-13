import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [error, setError] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotification('wrong username or password', true)
    }
  }

  const logout = () => {
    window.localStorage.removeItem('loggedBloglistUser')
    setUser(null)
  }

  const addBlog = async (blogObject) => {
    try {
      await blogService.create(blogObject)
      setBlogs(await blogService.getAll())

      setNotification(`a new blog ${blogObject.title} by ${blogObject.author} added`, false)
    } catch {
      setNotification('Error when trying to add a new blog. Please fill out all fields.', true)
    }
  }

  const setNotification = (message, error) => {
    setError(error)
    setNotificationMessage(message)
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
  }

  const loginForm = () => (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )

  const addLike = async (blogId, newBlog) => {
    await blogService.update(blogId, newBlog)
    setBlogs(await blogService.getAll())
  }

  const removeBlog = async (blogId) => {
    await blogService.remove(blogId)
    setBlogs(await blogService.getAll())
  }

  const blogList = () => (
    <div>
      {blogs
        .sort((blogA, blogB) => blogA.likes - blogB.likes)
        .map(blog => <Blog key={blog.id} blog={blog} likeBlog={addLike} removeBlog={removeBlog} />
        )}
    </div>
  )

  const blogForm = () => (
    <Togglable buttonLabel="new blog">
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  const logoutPrompt = () => (
    <div>
      <p>{user.name} logged in
      <button onClick={() => logout()}>
          logout
      </button>
      </p>

    </div>
  )

  const siteHeader = () => (
    user === null ?
      <h2>log in to application</h2> :
      <h2>blogs</h2>
  )

  return (
    <div>
      {siteHeader()}
      <Notification message={notificationMessage} isError={error} />
      {user === null ?
        loginForm() :
        <div>
          {logoutPrompt()}
          {blogForm()}
          {blogList()}
        </div>

      }
    </div>
  )
}

export default App
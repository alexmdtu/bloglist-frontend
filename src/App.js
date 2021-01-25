import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import { setNotification } from './reducers/notificationsReducer'
import { getBlogs, createBlog } from './reducers/blogReducer'
import { setUser } from './reducers/loginReducer'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from './reducers/userReducer'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

const App = () => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)

  useEffect(() => {
    dispatch(getBlogs())
    dispatch(getUsers())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    } else {
      dispatch(setUser(null))
    }
  }, [dispatch])

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
      dispatch(setUser(user))
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(setNotification('wrong username or password', 5, true))
    }
  }

  const logout = () => {
    window.localStorage.removeItem('loggedBloglistUser')
    dispatch(setUser(null))
  }

  const addBlog = (blogObject) => {
    dispatch(createBlog(blogObject))
  }

  const loginForm = () => (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-button" type="submit">login</button>
      </form>
    </div>
  )

  const addLike = async (blogId, newBlog) => {
    await blogService.update(blogId, newBlog)
    dispatch(getBlogs())
  }

  const removeBlog = async (blogId) => {
    await blogService.remove(blogId)
    dispatch(getBlogs())
  }

  const blogList = () => (
    <div>
      {blogs
        .sort((blogA, blogB) => blogA.likes - blogB.likes)
        .map(blog => <Blog key={blog.id} blog={blog} likeBlog={addLike} removeBlog={removeBlog} user={user} />
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

  const UserList = () => {
    return (
      <div>
        <h2>Users</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>blogs created</th>
            </tr>
            {users.map(n => <tr key={n.id}>
              <td>{n.name}</td>
              <td>{n.blogs.length}</td>
            </tr>)}
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <div>
      {siteHeader()}
      <Notification />
      {user === null ?
        loginForm() :
        <div>
          {logoutPrompt()}
          <Router>
            <Switch>
              <Route path='/blogs'>
                {blogForm()}
                {blogList()}
              </Route>
              <Route path='/users'>
                <UserList />
              </Route>
            </Switch>
          </Router>
        </div>
      }
    </div>
  )
}

export default App
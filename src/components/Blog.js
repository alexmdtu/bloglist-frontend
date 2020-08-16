import React, { useState } from 'react'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 10,
  paddingBottom: 10,
  border: 'solid',
  borderWidth: 1,
  marginTop: 10,
  marginBottom: 5
}

const Blog = ({ blog, likeBlog, removeBlog, user }) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }
  const showWhenUserLoggedIn = { display: blog.user.username === user.username ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const addLike = (event) => {
    event.preventDefault()
    likeBlog(blog.id,
      {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes + 1,
        user: blog.user
      })
  }

  const deleteBlog = (event) => {
    event.preventDefault()
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      removeBlog(blog.id)
    }
  }

  return (
    <div className="blog" style={blogStyle}>
      <div>
        {blog.title} by {blog.author}
        <button id="toggleVisibility-button" onClick={toggleVisibility}>{visible ? 'hide' : 'show'}</button>
      </div>
      <div style={showWhenVisible} className="extraBlogContent">
        <div>{blog.url}</div>
        <div>
          Likes: {blog.likes}
          <button id="addLike-button" onClick={addLike}>like</button>
        </div>
        <div>Added by: {blog.user.name}</div>
        <div style={showWhenUserLoggedIn}>
          <button id="delete-button" onClick={deleteBlog}>remove</button>
        </div>
      </div>

    </div>
  )
}

export default Blog

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

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} by {blog.author}
        <button onClick={toggleVisibility}>{visible ? 'hide' : 'show'}</button>
      </div>
      <div style={showWhenVisible}>
        <div>{blog.url}</div>
        <div>
          Likes: {blog.likes}
          <button>like</button>
        </div>
        <div>Added by: {blog.user.name}</div>
      </div>

    </div>
  )
}

export default Blog

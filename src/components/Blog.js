import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 10,
  paddingBottom: 10,
  border: 'solid',
  borderWidth: 1,
  marginTop: 10,
  marginBottom: 5
}

const Blog = ({ blog, user }) => {
  if (!user) {
    return null
  }

  return (
    <div className="blog" style={blogStyle}>
      <div>
        <Link to={`/blogs/${blog.id}`}>{blog.title} by {blog.author}</Link>
      </div>
    </div>
  )
}

export default Blog

import React from 'react'
const blogStyle = {
  paddingTop: 10,
  paddingLeft: 10,
  paddingBottom: 10,
  border: 'solid',
  borderWidth: 1,
  marginTop: 10,
  marginBottom: 5
}

const Blog = ({ blog }) => (
  <div style={blogStyle}>
    {blog.title} {blog.author}
  </div>
)

export default Blog

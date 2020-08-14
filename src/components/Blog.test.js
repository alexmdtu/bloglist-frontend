import React from 'react'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  test('renders only title and author by default', () => {
    const dummyUser = {
      username: 'Alex'
    }

    const blog = {
      title: 'Blogtitle',
      author: 'Alex',
      url: 'www.test.com',
      likes: 10,
      user: dummyUser
    }

    const component = render(
      <Blog blog={blog} user={dummyUser} />
    )

    const hiddenContentDiv = component.container.querySelector('.extraBlogContent')

    expect(component.container).toHaveTextContent('Blogtitle by Alex')
    expect(hiddenContentDiv).toHaveStyle('display: none')
  })
})
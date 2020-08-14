import React from 'react'
import '@testing-library/jest-dom'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
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

  test('renders only title and author by default', () => {
    const component = render(
      <Blog blog={blog} user={dummyUser} />
    )
    const hiddenContentDiv = component.container.querySelector('.extraBlogContent')

    expect(component.container).toHaveTextContent('Blogtitle by Alex')
    expect(hiddenContentDiv).toHaveStyle('display: none')
  })

  test('shows blog url and likes after clicking show button', () => {
    const component = render(
      <Blog blog={blog} user={dummyUser} />
    )
    const button = component.getByText('show')
    fireEvent.click(button)

    const hiddenContentDiv = component.container.querySelector('.extraBlogContent')
    expect(hiddenContentDiv).not.toHaveStyle('display: none')
  })

  test('handles like button correctly', () => {
    const addLike = jest.fn()

    const component = render(
      <Blog blog={blog} user={dummyUser} likeBlog={addLike} />
    )

    const button = component.getByText('like', { selector: 'button' })
    fireEvent.click(button)
    fireEvent.click(button)

    expect(addLike.mock.calls).toHaveLength(2)
  })
})
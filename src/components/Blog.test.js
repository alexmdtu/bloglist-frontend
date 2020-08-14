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

  let component

  beforeEach(() => {
    component = render(
      <Blog blog={blog} user={dummyUser} />
    )
  })

  test('renders only title and author by default', () => {
    const hiddenContentDiv = component.container.querySelector('.extraBlogContent')

    expect(component.container).toHaveTextContent('Blogtitle by Alex')
    expect(hiddenContentDiv).toHaveStyle('display: none')
  })

  test('shows blog url and likes after clicking show button', () => {
    const button = component.getByText('show')
    fireEvent.click(button)

    const hiddenContentDiv = component.container.querySelector('.extraBlogContent')
    expect(hiddenContentDiv).not.toHaveStyle('display: none')
  })
})
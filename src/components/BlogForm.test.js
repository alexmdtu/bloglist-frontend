import React from 'react'
import '@testing-library/jest-dom'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  test('creates new blog with correct parameters', () => {
    const createBlog = jest.fn()
    const component = render(
      <BlogForm createBlog={createBlog} />
    )

    const titleInput = component.container.querySelector('#title')
    const authorInput = component.container.querySelector('#author')
    const urlInput = component.container.querySelector('#url')

    const form = component.container.querySelector('form')

    fireEvent.change(titleInput, {
      target: { value: 'Test Title' }
    })
    fireEvent.change(authorInput, {
      target: { value: 'Alex' }
    })
    fireEvent.change(urlInput, {
      target: { value: 'www.test.com' }
    })

    fireEvent.submit(form)

    expect(createBlog.mock.calls).toHaveLength(1)
    const formInput = createBlog.mock.calls[0][0]
    expect(formInput.title).toBe('Test Title')
    expect(formInput.author).toBe('Alex')
    expect(formInput.url).toBe('www.test.com')
  })
})
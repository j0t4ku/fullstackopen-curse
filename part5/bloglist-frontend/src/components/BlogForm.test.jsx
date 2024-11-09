import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  test('Blog Form call the event handler with the correct props', async () => {
    const createBlog = vi.fn()
    const user = userEvent.setup()
    const component = render(<BlogForm createBlog={createBlog}></BlogForm>)

    const titleInput = component.container.querySelector('#title')
    const authorInput = component.container.querySelector('#author')
    const urlInput = component.container.querySelector('#url')
    const submitButton = component.container.querySelector('#create-blog-btn')

    await user.type(titleInput, 'Titulo')
    await user.type(authorInput, 'Autor')
    await user.type(urlInput, 'https://localhost.com')
    await user.click(submitButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0]).toEqual(['Titulo', 'Autor', 'https://localhost.com'])

  })
})
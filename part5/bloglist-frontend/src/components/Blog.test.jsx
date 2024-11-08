import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Blog from './Blog'

describe('<Blog />', () => {
  const blog = {
    title: 'juanito ',
    author: 'juanito',
    url: 'german.com',
    likes: 1,
    user: {
      username: 'root2',
      name: 'superuser',
    },
  }

  let component

  const likeMockHandler = vi.fn()

  beforeEach(() => {
    component = render(
      <Blog key={blog.id} blog={blog} updateLikes={likeMockHandler} />
    )
  })

  test('Render title and author but not url and likes', () => {
    expect(component.container.querySelector('.title')).toHaveTextContent(
      blog.title
    )
    expect(component.container.querySelector('.author')).toHaveTextContent(
      blog.author
    )
    expect(component.queryByText(blog.url)).not.toBeInTheDocument()
    expect(component.queryByText('like')).not.toBeInTheDocument()
  })

  test('At start children are not displayed', () => {
    const details = component.container.querySelector(".blog-details")
    expect(details).toEqual(null)
  })

  test('render url and likes when clicked on the button', () => {
    const button = component.container.querySelector('#view-btn')
    fireEvent.click(button)

    expect(component.container.querySelector('.blog-url')).toBeVisible()
    expect(component.container.querySelector('#like-btn')).toBeVisible()
  })



})
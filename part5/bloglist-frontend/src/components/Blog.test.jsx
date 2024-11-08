import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import { describe } from 'vitest'

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



})
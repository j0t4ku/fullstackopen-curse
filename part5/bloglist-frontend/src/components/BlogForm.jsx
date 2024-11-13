import { useState } from 'react'

export default function BlogForm({ createBlog }) {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })

  const handleCreateBlog = (event) => {
    event.preventDefault()
    createBlog(newBlog.title, newBlog.author, newBlog.url)
    setNewBlog({ title: '', author: '', url: '' })
  }

  const handleInputChange = (event) => {
    const { id, value } = event.target
    setNewBlog({ ...newBlog, [id]: value })
  }

  return (
    <div>
      <h1>Create New Blog</h1>
      <form onSubmit={handleCreateBlog}>
        <div>
          title
          <input
            name="title"
            id="title"
            type="text"
            value={newBlog.title}
            onChange={handleInputChange}
          />
        </div>
        <div>
          author
          <input
            name="author"
            id="author"
            type="text"
            value={newBlog.author}
            onChange={handleInputChange}
          />
        </div>
        <div>
          url
          <input
            name="url"
            id="url"
            type="text"
            value={newBlog.url}
            onChange={handleInputChange}
          />
        </div>
        <button name="create-blog-btn" type="submit">
          create
        </button>

      </form>
    </div >
  )
}
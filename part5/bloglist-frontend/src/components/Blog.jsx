import { useState } from 'react'

const Blog = ({ blog, updateLikes, deleteBlogs, loggedUser }) => {
  const [visible, setVisible] = useState(false)

  //functions
  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLike = () => {
    const blogToUpdate = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id,
    }
    updateLikes(blog.id, blogToUpdate)
  }

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      deleteBlogs(blog.id)
    }
  }

  const deleteButtons = () => {
    if (blog.user.username === loggedUser) {
      return (
        <button id='remove' onClick={handleRemove}>remove</button>
      )
    }
  }


  //Styles
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  return (
    <div style={blogStyle}>
      <div className="blog">
        <div>
          <span className="title">{blog.title} - </span>
          <span className="author">{blog.author}</span>{' '}
          <button id="view-btn" name='view' onClick={toggleVisibility}>
            {visible ? 'hide' : 'show'}
          </button>
        </div>
        {visible && (
          <div className="blog-details">
            <div className='blog-url'>{blog.url}</div>
            <div className=''>
              Likes: <span title='Nlikes'>{blog.likes}</span> {' '}
              <button className='likes-button' id="like-btn" onClick={handleLike}>
                like
              </button>{' '}
            </div>
            <div>{blog.user.name}</div>
            <div>
              {deleteButtons()}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Blog
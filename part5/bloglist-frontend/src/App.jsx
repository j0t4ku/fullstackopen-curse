import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notifications from './components/Notifications'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [user, setUser] = useState(null)

  // for notification
  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage(null)
    }, 5000)
    return () => {
      clearTimeout(timer)
    }
  }, [message])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const createBlog = async (title, author, url) => {
    try {
      blogFormRef.current.toggleVisibility()
      const blog = await blogService.create({
        title,
        author,
        url,
      })
      setBlogs(blogs.concat(blog))
      setMessage(`A new blog ${title} by ${author} added`)
    } catch (exception) {
      setMessage('error' + exception.response.data.error)
    }
  }

  const updateLikes = async (id, blogToUpdate) => {

    try {
      const updateBlog = await blogService.update(id, blogToUpdate)
      const newBlogs = blogs.map((blog) =>
        blog.id === id ? updateBlog : blog
      )
      setBlogs(newBlogs)
    } catch (err) {
      setMessage('error' + err.response.data)
    }
  }

  const deleteBlogs = async (id) => {
    try {
      const deletedBlog = await blogService.deleted(id)
      const updatedBlogs = blogs.filter((blog) => blog.id !== id)
      setBlogs(updatedBlogs)
      setMessage(`Blog: ${deletedBlog.title} has been remove`)

    } catch (exception) {
      setMessage('error' + exception.response.data.error)
    }
  }

  const handleLogin = async (username, password) => {
    console.log()
    try {
      console.log(username, password)
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      console.log(user)
      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      setMessage('error' + exception.response.data.error)
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)

  }

  const blogFormRef = useRef()
  console.log(blogs)
  return (
    <div>
      {user === null ? <LoginForm handleLogin={handleLogin} />
        :
        <div>
          <div style={{ paddingBottom: '5px' }}>
            <h1>Blogs</h1>
            <p>{user.username} logged in </p>
            <button onClick={handleLogout} name='logout'>logout</button>
          </div>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm createBlog={createBlog} />
          </Togglable>
        </div>
      }
      <Notifications message={message} />
      <div>
        <h2>blogs</h2>
        {blogs
          .sort((a, b) => b.likes - a.likes)//Enumera las publicaciones de blog por el número de likes
          .map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              updateLikes={updateLikes}
              username={blog.user.username}
              deleteBlogs={deleteBlogs}
            />
          )}

      </div>
    </div>
  )
}

export default App
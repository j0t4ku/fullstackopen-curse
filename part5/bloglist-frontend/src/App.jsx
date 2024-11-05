import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notifications from './components/Notifications'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState({ title: "", author: "", url: "" });
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null);
  const [user, setUser] = useState(null)

  // for notification
  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage(null);
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [message]);

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const createBlog = async (title, author, url) => {
    try {
      const blog = await blogService.create({
        title,
        author,
        url,
      });
      setBlogs(blogs.concat(blog));
      setMessage(`A new blog ${title} by ${author} added`);
    } catch (exception) {
      setMessage("error" + exception.response.data.error);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      blogService.setToken(user.Token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleCreateBlog = (event) => {
    event.preventDefault();
    createBlog(newBlog.title, newBlog.author, newBlog.url);
    setNewBlog({ title: "", author: "", url: "" });
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewBlog({ ...newBlog, [name]: value });
  };

  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null);

  }


  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const logoutForm = () => {
    return (
      <div style={{ paddingBottom: "5px" }}>
        <h1>Blogs</h1>
        <p>{user.username} logged in </p>
        <button onClick={handleLogout}>logout</button>
      </div>
    )
  }

  const blogForm = () => {
    return (
      <div>
        <h1>Create New Blog</h1>
        <form onSubmit={handleCreateBlog}>
          <div>
            title
            <input
              name="title"
              type="text"
              value={newBlog.title}
              onChange={handleInputChange}
            />
          </div>
          <div>
            author
            <input
              name="author"
              type="text"
              value={newBlog.author}
              onChange={handleInputChange}
            />
          </div>
          <div>
            url
            <input
              name="url"
              type="text"
              value={newBlog.url}
              onChange={handleInputChange}
            />
          </div>
          <button id="create-blog-btn" type="submit">
            create
          </button>

        </form>
      </div >
    )
  }

  return (
    <div>
      {user === null && loginForm()}
      {user !== null && logoutForm()}
      <Notifications message={message} />
      {user !== null && blogForm()}
      <div>
        <h2>blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}

      </div>
    </div>
  )
}

export default App
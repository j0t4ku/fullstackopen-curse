import { useState } from "react";

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false);
  const toggleVisibility = () => {
    setVisible(!visible);
  };
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
          <span className="author">{blog.author}</span>{" "}
          <button id="view-btn" onClick={toggleVisibility}>
            {visible ? "hide" : "show"}
          </button>
        </div>
        {visible && (
          <div className="blog-details">
            <div>{blog.url}</div>
            <div>
              Likes: {blog.likes}{" "}
              <button id="like-btn" onClick={() => { }}>
                like
              </button>{" "}
            </div>
            <div>{blog.user.username}</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Blog
export default function BlogForm({ handleCreateBlog, newBlog, handleInputChange }) {
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
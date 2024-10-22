const Blog = require('../models/blogs')

const blogs = require('../utils/const')//inital values blogs

const initialBlogs = blogs

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}
module.exports = {
    initialBlogs, blogsInDb
}
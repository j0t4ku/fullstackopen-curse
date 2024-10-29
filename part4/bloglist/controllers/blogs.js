const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 })
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {

    const body = request.body
    const user = await User.findOne({ username: "root" })
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
    })


    const newblog = await blog.save()
    user.blogs = user.blogs.concat(newblog._id);
    await user.save()
    response.status(201).json(newblog.toJSON())
})

blogsRouter.delete('/:id', async (req, res) => {
    const id = req.params.id

    const blog = await Blog.findByIdAndDelete(id, { new: true })

    res.status(204).json(blog)

})

blogsRouter.put("/:id", async (req, res) => {
    const blog = req.body;
    const id = req.params.id;
    console.log(id, blog)
    const updatedBlog = await Blog.findByIdAndUpdate(id, blog, {
        new: true,
    })

    res.status(200).json(updatedBlog)
});


module.exports = blogsRouter
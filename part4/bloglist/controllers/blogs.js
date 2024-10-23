const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)

    const newblog = await blog.save()
    response.status(201).json(newblog)
})

blogsRouter.delete('/:id', async (req, res) => {
    const id = req.params.id

    const blog = await Blog.findByIdAndDelete(id, { new: true })

    res.status(204).json(blog)

})


module.exports = blogsRouter
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
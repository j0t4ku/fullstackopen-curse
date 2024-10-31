const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        return authorization.replace('Bearer ', '')
    }
    return null
}


blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 })
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {

    const body = request.body
    //Exercise 4.19
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(decodedToken.id)
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
    const decodedToken = jwt.verify(req.token, process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(decodedToken.id)
    const blogAtdelete = await Blog.findById(id)
    if (blogAtdelete.user.toString() === user.id.toString()) {
        const blogDelete = await Blog.findByIdAndDelete(id, { new: true });
        res.status(200).json(blogDelete);
    } else {
        res.status(401).json({ error: "unauthorized operation" });
    }

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
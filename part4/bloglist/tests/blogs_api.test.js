const { test, after, beforeEach, describe, it } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blogs')
const helper = require('./blogs_helper')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { config } = require('dotenv')


const api = supertest(app)
let token = null

beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
    await User.deleteMany({});
    const passwordHash = await bcrypt.hash("12345", 10);
    const user = await new User({ username: "root", passwordHash }).save();
    const userForToken = { username: "root", id: user.id };
    token = jwt.sign(userForToken, process.env.SECRET)
})

describe('Exercise 4.8-4.12', () => {

    test('Blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('there are six blogs', async () => {
        const response = await api.get('/api/blogs')
        assert.strictEqual(response.body.length, helper.initialBlogs.length)
    })

    test('blogs have to propety id', async () => {
        const response = await api.get('/api/blogs')
        assert(response.body.every((blog) => blog.hasOwnProperty('id')))
    })

})

describe("Add to new blog", () => {
    test('Valid blogs add', async () => {
        const newBlog = {
            title: "React ViteJs",
            author: "Joe Chan",
            url: "https://reactvite.com/",
            likes: 1
        }
        await api
            .post('/api/blogs')
            .set("Authorization", `Bearer ${token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        const blogsAtEnd = await helper.blogsInDb()
        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
        const content = blogsAtEnd.map(n => n.title)
        assert(content.includes('React ViteJs'))

    })


    test('Likes property default to 0 if missing', async () => {
        const newBlog = {
            title: 'Title1',
            author: 'Author1',
            url: 'http://test.com'
        }
        await api
            .post('/api/blogs')
            .set("Authorization", `Bearer ${token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        const blogsList = await helper.blogsInDb()
        assert.strictEqual(blogsList.length, helper.initialBlogs.length + 1)
        assert.strictEqual(blogsList[blogsList.length - 1].likes, 0)
    })

    test('Backend response 400 if title missing', async () => {
        const newBlog = {
            likes: 1,
        }

        await api.post('/api/blogs')
            .set("Authorization", `Bearer ${token}`)
            .send(newBlog)
            .expect(400)

        const blogsList = await helper.blogsInDb()
        assert.strictEqual(blogsList.length, helper.initialBlogs.length)
    })
    test('Backend response 401 if Unauthorized ', async () => {
        const newBlog = {
            likes: 1,
        }

        await api.post('/api/blogs')
            .send(newBlog)
            .expect(401)

        const blogsList = await Blog.find({}).populate("user")
        assert.strictEqual(blogsList.length, helper.initialBlogs.length)
    })

})

describe('Delete of Blogs', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})
        const newBlog = {
            title: 'Title1',
            author: 'Author1',
            url: 'http://test.com'
        }
        await api
            .post('/api/blogs')
            .set("Authorization", `Bearer ${token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
    })

    test('Delete blog test', async () => {
        const blogStart = await helper.blogsInDb()
        const blogAtDelete = blogStart[blogStart.length - 1]
        await api
            .delete(`/api/blogs/${blogAtDelete.id}`)
            .set("Authorization", `Bearer ${token}`)
            .expect(200)
        const blogEnd = await helper.blogsInDb()
        assert.strictEqual(blogEnd.length, blogStart.length - 1)
        const titles = blogEnd.map((blog) => blog.title);
        assert(!titles.includes(blogStart[0].title))
    })
})

describe('Updating blog', () => {
    test('updating blog return 200 ok', async () => {
        const blogListStart = await helper.blogsInDb()
        const blogAtUpdate = blogListStart[0]

        await api.
            put(`/api/blogs/${blogAtUpdate.id}`)
            .send({ likes: 10 })
            .expect(200)

        const blogListEnd = await helper.blogsInDb()
        const blogUpdated = blogListEnd[0]
        assert.strictEqual(blogListStart.length, blogListEnd.length)
        assert.strictEqual(blogUpdated.likes, 10)
    })
})

after(async () => {
    await mongoose.connection.close()
})
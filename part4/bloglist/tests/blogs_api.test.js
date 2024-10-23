const { test, after, beforeEach, describe, it } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blogs')
const helper = require('./blogs_helper')


const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
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

    test('Valid blogs add', async () => {
        const newBlog = {
            title: "React ViteJs",
            author: "Joe Chan",
            url: "https://reactvite.com/",
            likes: 1,
        }
        await api
            .post('/api/blogs')
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
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        const blogsList = await helper.blogsInDb()
        assert.strictEqual(blogsList.length, helper.initialBlogs.length + 1)
        assert.strictEqual(blogsList[blogsList.length - 1].likes, 0)
    })
})

after(async () => {
    await mongoose.connection.close()
})
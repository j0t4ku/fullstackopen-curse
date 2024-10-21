const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blogs')

const blogs = require('../utils/const')//inital values blogs


const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(blogs[0])
    await blogObject.save()
    blogObject = new Blog(blogs[1])
    await blogObject.save()
    blogObject = new Blog(blogs[2])
    await blogObject.save()
    blogObject = new Blog(blogs[3])
    await blogObject.save()
    blogObject = new Blog(blogs[4])
    await blogObject.save()
    blogObject = new Blog(blogs[5])
    await blogObject.save()
})

test.only('Blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test.only('there are six blogs', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, 6)
})

after(async () => {
    await mongoose.connection.close()
})
const { test, after, beforeEach, describe, it } = require('node:test')
const mongoose = require('mongoose')
const assert = require('node:assert')
const app = require('../app')
const supertest = require('supertest')

const bcrypt = require('bcrypt')
const User = require('../models/user')
const helper = require('./user_helper')

const api = supertest(app)
//Initializing database
beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })
    await user.save()
})

describe('Users testing', () => {

    test('Users are returned as json', async () => {
        await api
            .get('/api/users')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('Creation user', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'UserTest',
            name: 'User Test',
            password: 'user123',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        assert(usernames.includes(newUser.username))
    })

    test('Creation user exist ', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'root',
            name: 'User Test',
            password: 'user123',
        }

        const res = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        console.log(res.body)
        assert.deepStrictEqual(res.body.error, "User must be unique")
    })

    test('Error password o user does exist ', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            name: 'User Test',
        }

        const res = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)


        assert.strictEqual(res.body.error, "Username and password are required")
    })

    test('Error at length in password o user', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'Us',
            name: 'User Test',
            password: 'user123',
        }

        const res = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)


        assert.strictEqual(res.body.error, "username and password must be at least 3 character long")
    })

})

after(async () => {
    await mongoose.connection.close()
})
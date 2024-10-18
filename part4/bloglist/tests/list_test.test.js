const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const blogList = require('../utils/const')

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    assert.strictEqual(result, 1)
})

describe("Total Likes", () => {

    test("totalLikes", () => {
        const result = listHelper.totalLikes(blogList)
        assert.strictEqual(result, 36)
    })
})

describe("Favorite Blog ", () => {

    test("favoriteBlog", () => {
        const compare = {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12
        }
        const result = listHelper.favoriteBlog(blogList)
        assert.deepStrictEqual(result, compare)
    })
})
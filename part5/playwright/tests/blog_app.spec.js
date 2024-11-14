const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    //Reset database
    await request.post('http://localhost:3001/api/testing/reset')

    //Create user for testing
    await request.post('http://localhost:3001/api/users', {
      data: {
        name: 'SuperUser',
        username: 'root',
        password: 'root123'
      }
    })
    //Go to page
    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    const form = page.locator('form')
    const userName = page.locator('#Username')
    const password = page.locator('#Password')
    const submitButton = page.getByRole('button', { name: 'login' })

    await expect(form).toBeVisible()
    await expect(userName).toBeVisible()
    await expect(password).toBeVisible()
    await expect(submitButton).toBeVisible()

  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'root', 'root123')
      //await expect(page.getByText('root logged in')).toBeVisible()
      await expect(page.getByRole('button', { name: 'logout' })).toBeVisible()

    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'root', '123')

      await expect(page.getByText('root logged in')).not.toBeVisible()
      await expect(page.getByRole('button', { name: 'logout' })).not.toBeVisible()
      await expect(page.getByText('invalid username or password')).toBeVisible()

    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'root', 'root123')
    })

    test('a new blog can be created', async ({ page }) => {
      const newTitle = 'New Title Confirmed'
      await createBlog(page, newTitle, 'root', '/test-blog')
      await expect(page.getByText('A new blog New Title Confirmed by root added')).toBeVisible()
      await expect(page.getByText('New Title Confirmed -')).toBeVisible()
      await expect(page.getByRole('button', { name: 'show' })).toBeVisible()

    })

    test('Can be liked', async ({ page }) => {
      const newBlog = {
        title: 'Title 2',
        author: 'author',
        url: '/test-url'
      }
      await createBlog(page, newBlog.title, newBlog.author, newBlog.url)
      await expect(page.getByRole('button', { name: 'show' })).toBeVisible()
      await page.getByRole('button', { name: 'show' }).click()
      await expect(page.getByTitle('NLikes')).toHaveText('0')
      await page.getByRole('button', { name: 'Like' }).click()
      await expect(page.getByTitle('NLikes')).toHaveText('1')
    })

    test('Can be Delete', async ({ page }) => {
      const newBlog = {
        title: 'Title 2',
        author: 'author',
        url: '/test-url'
      }
      await createBlog(page, newBlog.title, newBlog.author, newBlog.url)
      await expect(page.getByRole('button', { name: 'show' })).toBeVisible()
      await page.getByRole('button', { name: 'show' }).click()
      //On page dialog delete
      page.on('dialog', dialog => dialog.accept())
      await page.getByRole('button', { name: 'remove' }).click()
      await expect(page.getByText('Blog: Title 2 has been remove')).toBeVisible()
      await expect(page.getByText('Title 2 -')).not.toBeVisible()
    })
  })

})
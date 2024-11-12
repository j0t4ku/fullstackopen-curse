const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page }) => {
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
})
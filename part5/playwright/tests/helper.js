const loginWith = async (page, username, password) => {
  await page.locator('#Username').fill(username)
  await page.locator('#Password').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async (page, title, author, url) => {
  await page.getByRole('button', { name: 'new blog' }).click()
  await page.locator('#title').fill(title)
  await page.locator('#author').fill(author)
  await page.locator('#url').fill(url)
  await page.getByRole('button', { name: 'create' }).click()
}

export { loginWith, createBlog }
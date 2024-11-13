const loginWith = async (page, username, password) => {
  await page.locator('#Username').fill(username)
  await page.locator('#Password').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

export { loginWith }
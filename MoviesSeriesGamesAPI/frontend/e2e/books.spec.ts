import { test, expect } from '@playwright/test'

test('Should Render a list of Books', async ({ page }) => {
  await page.goto('http://localhost:3000/books')

  const bookList = page.getByTestId('books-list')
  const childElementsCount = await bookList.evaluate(element => element.childElementCount)

  expect(childElementsCount).toBeGreaterThan(0)
})

test('should go to edit-book', async ({ page }) => {
  await page.goto('http://localhost:3000/books')

  await page.getByText('The Hobbit').click()

  await expect(page).toHaveURL('http://localhost:3000/books/edit-book/0eda4496-d195-11ee-8666-18c04d1c9c8f')
})

test('should go to create-book', async ({ page }) => {
  await page.goto('http://localhost:3000/books')

  await page.getByText('+ Add Book').click()

  await expect(page).toHaveURL('http://localhost:3000/books/create-book')
})

import { test, expect } from '@playwright/test'

test('Should Render a list of Movies', async ({ page }) => {
  await page.goto('http://localhost:3000/movies')

  const movieList = page.getByTestId('movies-list')
  const childElementsCount = await movieList.evaluate(element => element.childElementCount)

  expect(childElementsCount).toBeGreaterThan(0)
})

test('should go to edit-movie', async ({ page }) => {
  await page.goto('http://localhost:3000/movies')

  await page.getByText('The Two Towers', { exact: true }).click()

  await expect(page).toHaveURL('http://localhost:3000/movies/edit-movie/0ed9cda0-d195-11ee-8666-18c04d1c9c8f')
})

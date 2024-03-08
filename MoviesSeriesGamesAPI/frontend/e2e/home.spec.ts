import { test, expect } from '@playwright/test'

test('Navigate to movies', async ({ page }) => {
  await page.goto('http://localhost:3000/')

  await page.getByText('Movies').click()

  await expect(page).toHaveURL('http://localhost:3000/movies')
})

test('Navigate to books', async ({ page }) => {
  await page.goto('http://localhost:3000/')

  await page.getByText('Books').click()

  await expect(page).toHaveURL('http://localhost:3000/books')
})

test('Navigate to series', async ({ page }) => {
  await page.goto('http://localhost:3000/')

  await page.getByText('Series').click()

  await expect(page).toHaveURL('http://localhost:3000/series')
})

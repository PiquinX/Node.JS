import { test, expect } from '@playwright/test'

test('Should Render a list of Series', async ({ page }) => {
  await page.goto('http://localhost:3000/series')

  const seriesList = page.getByTestId('series-list')
  const childElementsCount = await seriesList.evaluate(element => element.childElementCount)

  expect(childElementsCount).toBeGreaterThan(0)
})

test('should go to edit-serie', async ({ page }) => {
  await page.goto('http://localhost:3000/series')

  await page.getByText('James Hoffmann: The AeroPress Series').click()

  await expect(page).toHaveURL('http://localhost:3000/series/edit-serie/0edaff81-d195-11ee-8666-18c04d1c9c8f')
})

test('should edit serie', async ({ page }) => {
  const newTitle = 'Chainsaw Man.'

  await page.goto('http://localhost:3000/series/edit-serie/fdaf6ee3-d19a-11ee-8666-18c04d1c9c8f')

  await page.getByPlaceholder('Title').fill(newTitle)

  await page.getByRole('button', { name: 'UPDATE SERIE' }).click()

  await expect(page).toHaveURL('http://localhost:3000/series')

  expect(page.getByText(newTitle)).toBeDefined()
})

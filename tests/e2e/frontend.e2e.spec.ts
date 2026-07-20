import { test, expect } from '@playwright/test'

test.describe('Frontend', () => {
  test('Startseite lädt mit allen Sections', async ({ page }) => {
    await page.goto('http://localhost:3000')

    await expect(page).toHaveTitle(/Weinmacher Mühltal/)

    const heading = page.locator('h1').first()
    await expect(heading).toHaveText('Wein, der nach Zuhause schmeckt.')

    for (const id of ['ueber', 'weine', 'events', 'verleih', 'kontakt']) {
      await expect(page.locator(`#${id}`)).toBeAttached()
    }
  })
})

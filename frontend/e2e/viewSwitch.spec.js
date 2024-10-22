import { test, expect } from "@playwright/test"

test("switches views and correct buttons are active", async ({ page }) => {
  await page.goto("/map")
  await expect(page.getByTestId("map")).toBeVisible()
  // Checks if correct button is active
  await expect(page.getByRole("button", { name: "Map" })).toHaveClass("active")
  await expect(page.getByRole("button", { name: "List" })).not.toHaveClass(
    "active",
  )

  await page.getByTestId("switch-to-list-link").click()
  await expect(page.getByTestId("addresses-list")).toBeVisible()
  await expect(page.getByRole("button", { name: "List" })).toHaveClass("active")
  await expect(page.getByRole("button", { name: "Map" })).not.toHaveClass(
    "active",
  )

  await page.getByTestId("switch-to-map-link").click()
  await expect(page.getByTestId("switch-to-list-link")).toBeVisible()
  await expect(page.getByRole("button", { name: "Map" })).toHaveClass("active")
  await expect(page.getByRole("button", { name: "List" })).not.toHaveClass(
    "active",
  )
})

test("clicking on list item switches active button", async ({ page }) => {
  await page.goto("/list")
  await expect(page.getByTestId("addresses-list")).toBeVisible()
  await expect(page.getByRole("button", { name: "List" })).toHaveClass("active")
  await expect(page.getByRole("button", { name: "Map" })).not.toHaveClass(
    "active",
  )

  await page.getByRole("listitem").first().click()
  await expect(page.getByRole("button", { name: "Map" })).toHaveClass("active")
  await expect(page.getByRole("button", { name: "List" })).not.toHaveClass(
    "active",
  )
})

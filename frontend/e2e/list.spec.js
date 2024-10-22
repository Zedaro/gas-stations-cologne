import { test, expect } from "@playwright/test"

const json = {
  features: [
    {
      attributes: {
        objectid: 1,
        adresse: "Schmitz Str. 1",
      },
      geometry: {
        x: 100,
        y: 100,
      },
    },
    {
      attributes: {
        objectid: 2,
        adresse: "Bonner Str. 2",
      },
      geometry: {
        x: 200,
        y: 200,
      },
    },
    {
      attributes: {
        objectid: 3,
        adresse: "Bonner Str. 3",
      },
      geometry: {
        x: 300,
        y: 300,
      },
    },
    {
      attributes: {
        objectid: 4,
        adresse: "Pariser Str. 4",
      },
      geometry: {
        x: 400,
        y: 400,
      },
    },
  ],
}
const apiWildcard = "https://geoportal.stadt-koeln.de/**"

test("has list", async ({ page }) => {
  await page.goto("/list")
  await expect(page.getByRole("list")).toBeVisible()
})

test("can filter list", async ({ page }) => {
  await page.route(apiWildcard, async (route) => {
    await route.fulfill({ json })
  })
  await page.goto("/list")

  await page.getByRole("searchbox").fill("Bonner Str.")

  await expect(page.getByRole("list")).toContainText("Bonner Str.")
  await expect(page.getByRole("list")).not.toContainText("Pariser Str.")
  await expect(page.getByRole("list")).not.toContainText("Schmitz Str.")
})

test("can sort list", async ({ page }) => {
  await page.route(apiWildcard, async (route) => {
    await route.fulfill({ json })
  })
  await page.goto("/list")

  // Descending
  await page.getByTestId("sort-button").click()
  const list = await page.getByRole("listitem").all()
  await expect(list[0]).toContainText("Schmitz Str.")
  await expect(list[3]).toContainText("Bonner Str.")

  // Ascending
  await page.getByTestId("sort-button").click()
  await expect(list[0]).toContainText("Bonner Str.")
  await expect(list[3]).toContainText("Schmitz Str.")
})

test("can sort and filter list", async ({ page }) => {
  await page.route(apiWildcard, async (route) => {
    await route.fulfill({ json })
  })
  await page.goto("/list")

  // Descending
  await page.getByTestId("sort-button").click()
  const list = await page.getByRole("listitem").all()

  // Filter
  await page.getByRole("searchbox").fill("Bonner Str.")

  // Filter assertion
  await expect(page.getByRole("list")).toContainText("Bonner Str. 2")
  await expect(page.getByRole("list")).toContainText("Bonner Str. 3")
  await expect(page.getByRole("list")).not.toContainText("Pariser Str.")
  await expect(page.getByRole("list")).not.toContainText("Schmitz Str.")

  // Sort assertion
  await expect(list[0]).toContainText("Bonner Str. 3")
  await expect(list[1]).toContainText("Bonner Str. 2")
})

test("clicking on list item switches view to map", async ({ page }) => {
  await page.route(apiWildcard, async (route) => {
    await route.fulfill({ json })
  })
  await page.goto("/list")
  await expect(page.getByTestId("addresses-list")).toBeVisible()

  await page.getByRole("listitem").first().click()
  await expect(page.getByTestId("map")).toBeVisible()
  await expect(page.getByRole("search")).toBeVisible()
  const firstAddress = json.features[0].attributes.adresse
  // TODO: Fix this. I don't know why, but the input text isn't in the HTML, it seems
  await expect(page.getByRole("search")).toContainText(firstAddress)
})

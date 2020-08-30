context("homePage", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000")
  })

  it("should display topbar", () => {
    cy.get("[class*=topbar]").should("be.visible")
  })

  it("should display initial spinner", () => {
    cy.get("[class*=spinner]")
  })

  it("should display default cities", () => {
    cy.contains("Beijing")
    cy.contains("Delhi")
  })

  it("should not contain favorites initially", () => {
    cy.contains("Favorites").should("not.exist")
  })

  it("should remove Beijing from the list", () => {
    cy.get(".fa-trash-alt").first().click()
    cy.contains("Beijing").should("not.exist")
  })

  it("should add Beijing to favorites and display favorites list", () => {
    cy.get(".fa-heart").first().click()
    cy.contains("Favorites").siblings("[class*=city]").contains("Beijing")
  })

  it("should load search results and keep Beijing in favorite list", () => {
    cy.get(".fa-heart").first().click()
    cy.get("[class*=topbar] input").type("a")
    cy.contains("Beijing")
    cy.get("[class*=spinner]")
    cy.contains("Amsterdam")
  })

  it("should remove Buenos Aires from favorites and not display favorite list", () => {
    cy.get(".fa-heart").first().click()
    cy.get(".fa-heart").first().click()
    cy.contains("Favorites").should("not.exist")
  })

  it("should navigate to Buenos Aires page without loading", () => {
    cy.contains("Buenos Aires").click()
    cy.get("[class*=spinner]").should("not.exist")
    cy.contains("Buenos Aires")
  })

  it("should navigate to user location page", () => {
    cy.mockGeolocation()
    cy.contains("My").click()
    cy.get("[class*=spinner]")
    cy.contains("Hays City, United States of America")
  })
})

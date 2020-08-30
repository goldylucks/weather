context("cityPage", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/city/user-location")
  })

  it("should load page", () => {
    cy.contains("Loading")
    cy.contains("Hays City")
    cy.contains("Feels like")
  })
})

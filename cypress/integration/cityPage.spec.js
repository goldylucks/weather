context("cityPage", () => {
  before(() => {
    const beijingId = "ChIJuSwU55ZS8DURiqkPryBWYrk"
    cy.visit("http://localhost:3000/city/" + beijingId)
  })

  it("should display city details", () => {
    cy.contains("Beijing")
    cy.contains("Feels like")
    cy.contains("Humidity")
  })

  // WARNING these tests rely on each other and must be kept
  // in the current order. this is very bad practice but calling
  // cy.visit before each test persists the data from the previous
  // test, leading to inconsistencies
  describe("notes", () => {
    const noteText = "My note"
    const addedText = " more text"
    it("should add a note", () => {
      cy.get("textarea").type(noteText)
      cy.contains("Add note").click()
      cy.get("textarea").should("have.value", "")
      cy.contains(noteText)
    })

    it("should discard edit of a note", () => {
      cy.get(".fa-edit").click()
      cy.get("textarea").first().type(addedText)
      cy.contains("Cancel").click()
      cy.contains(noteText + addedText).should("not.exist")
    })

    it("should edit a note", () => {
      cy.get(".fa-edit").click()
      cy.get("textarea")
        .first()
        .should("have.value", noteText + addedText)
      cy.get("textarea").first().type(addedText)
      cy.contains("Confirm").click()
      cy.contains(noteText + addedText + addedText)
    })

    it("should delete a note", () => {
      cy.get(".fa-trash-alt").click()
      cy.contains(noteText).should("not.exist")
    })
  })

  describe("search results modal", () => {
    it("should open the modal when focusing topbar search", () => {
      cy.get("[class*=topbar] input").focus()
      cy.get("[class*=modal]")
      cy.contains("Beijing")
      cy.get("[class*=spinner]").should("not.exist")
    })

    it("should close the modal on clicking the X", () => {
      cy.get("[class*=topbar] input").focus()
      cy.get("[class*=modal] .fa-times").click()
      cy.get("[class*=modal]").should("not.exist")
    })

    it("should close the modal on pressing esc", () => {
      cy.get("[class*=topbar] input").focus()
      cy.get("[class*=modal]").trigger("keydown", { keyCode: 27, which: 27 })
      // in the real app the first esc key will only blur the input
      // and won't be caught in the event listener, but in cypress
      // seems like one is enough to close the modal, probably
      // because cy.get() removes the focus from the input
      // cy.get("[class*=modal]").trigger("keydown", { keyCode: 27, which: 27 })
      cy.get("[class*=modal]").should("not.exist")
      cy.mockGeolocation()
      cy.contains("My").click()
      cy.url().should("include", "/user-location") // => true
    })
  })
})

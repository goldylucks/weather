context("citypage", () => {
  beforeEach(() => {
    const beijingId = "ChIJuSwU55ZS8DURiqkPryBWYrk"
    cy.visit("http://localhost:3000/city/" + beijingId)
  })

  it("should display city details", () => {
    cy.contains("Beijing")
    cy.contains("Feels like")
    cy.contains("Humidity")
  })

  describe("notes", () => {
    it("should add a note", () => {
      const noteText = "My note"
      cy.get("textarea").type(noteText)
      cy.contains("Add note").click()
      cy.get("textarea").should("have.value", "")
      cy.contains(noteText)
    })

    it("should edit a note", () => {
      const noteText = "My note"
      const addedText = " more text"
      cy.get("textarea").type(noteText)
      cy.contains("Add note").click()
      cy.get(".fa-edit").click()
      cy.get("textarea").first().should("have.value", noteText)
      cy.get("textarea").first().type(addedText)
      cy.contains("Confirm").click()
      cy.contains(noteText + addedText)
    })

    it("should discard edit of a note", () => {
      const noteText = "My note"
      const addedText = " some text here"
      cy.get("textarea").type(noteText)
      cy.contains("Add note").click()
      cy.get(".fa-edit").click()
      cy.get("textarea").first().type(addedText)
      cy.contains("Cancel").click()
      cy.contains(noteText + addedText).should("not.exist")
    })

    it("should delete a note", () => {
      const noteText = "My note"
      cy.get("textarea").type(noteText)
      cy.contains("Add note").click()
      cy.get(".fa-trash-alt").click()
      cy.contains(noteText).should("not.exist")
    })
  })

  describe("search results modal", () => {
    it("should open the modal when focusing topbar search", () => {
      cy.get("[class*=topbar] input").focus()
      cy.get("[class*=modal]")
      cy.contains("Beijing")
      cy.contains("Loading").should("not.exist")
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
    })
  })
})

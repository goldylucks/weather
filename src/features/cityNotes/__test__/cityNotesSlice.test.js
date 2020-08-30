import cityNotesReducer, { remove, add } from "../cityNotesSlice"

jest.mock("uuid", () => ({
  v4: () => 1,
}))

describe("cityNotesReducer", () => {
  describe("remove", () => {
    it("should remove note and listId", () => {
      // given
      const id = 1
      const listId = 2
      const state = {
        [listId]: {
          [id]: {},
        },
      }
      // when
      const result = cityNotesReducer(state, remove({ id, listId }))
      // then
      expect(result).toEqual({})
    })
  })
  describe("add", () => {
    it("should add list id and add note under that", () => {
      // given
      const id = 1 // must match mocked value at top of the page
      const listId = 1
      const text = "foo"
      const state = {}
      // when
      const result = cityNotesReducer(state, add({ listId, text }))
      // then
      expect(result).toEqual({
        [listId]: {
          [id]: {
            id,
            text,
            editingText: text,
            listId,
            isEditing: false,
          },
        },
      })
    })
  })
})

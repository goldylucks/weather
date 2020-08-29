import { createSlice } from "@reduxjs/toolkit"
import { v4 as uuidv4 } from "uuid"

const cityNotesSlice = createSlice({
  name: "cityNotes",
  initialState: {},
  reducers: {
    remove: (state, action) => {
      const { listId, id } = action.payload
      delete state[listId][id]
      // delete the list key if it's the last note
      if (Object.keys(state[listId]).length === 0) {
        delete state[listId]
      }
      return state
    },
    add: (state, action) => {
      const { listId, text } = action.payload
      const id = uuidv4()
      state[listId] = state[listId] || {}
      state[listId][id] = {
        id,
        listId,
        text,
        editingText: text,
        isEditing: false,
      }
    },
    startEditing: (state, action) => {
      const { listId, id } = action.payload
      let note = state[listId][id]
      note.isEditing = true
    },
    setEditingText: (state, action) => {
      const { listId, id, editingText } = action.payload
      let note = state[listId][id]
      note.editingText = editingText
    },
    confirmEdit: (state, action) => {
      const { listId, id, editingText } = action.payload
      let note = state[listId][id]
      note.isEditing = false
      note.text = editingText
    },
    cancelEdit: (state, action) => {
      const { listId, id } = action.payload
      let note = state[listId][id]
      note.isEditing = false
    },
  },
})

export const {
  startEditing,
  setEditingText,
  confirmEdit,
  cancelEdit,
  add,
  remove,
} = cityNotesSlice.actions

export default cityNotesSlice.reducer

const { createSlice } = require("@reduxjs/toolkit")

const searchSlice = createSlice({
  name: "search",
  initialState: {
    query: "",
    setIsInnerPagesSearchModalOpen: false,
  },
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload
    },
    setIsInnerPagesSearchModalOpen: (state, action) => {
      state.isInnerPagesSearchModalOpen = action.payload
    },
  },
})

export const { setQuery, setIsInnerPagesSearchModalOpen } = searchSlice.actions

export default searchSlice.reducer

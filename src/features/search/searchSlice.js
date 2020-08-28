const { createSlice } = require("@reduxjs/toolkit")

const searchSlice = createSlice({
  name: "search",
  initialState: {
    query: "",
    setIsModalOpen: false,
  },
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload
    },
    setIsModalOpen: (state, action) => {
      state.isModalOpen = action.payload
    },
  },
})

export const { setQuery, setIsModalOpen } = searchSlice.actions

export default searchSlice.reducer

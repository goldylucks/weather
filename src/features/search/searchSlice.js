const { createSlice } = require("@reduxjs/toolkit")

const searchSlice = createSlice({
  name: "search",
  initialState: {
    query: "",
    inFocus: false,
  },
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload
    },
    setInFocus: (state, action) => {
      state.inFocus = action.payload
    },
  },
})

export const { setQuery, setInFocus } = searchSlice.actions

export default searchSlice.reducer

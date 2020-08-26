import { combineReducers } from "@reduxjs/toolkit"
import searchReducer from "../features/search/searchSlice"

export default combineReducers({
  search: searchReducer,
})

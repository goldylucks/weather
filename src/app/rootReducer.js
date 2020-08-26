import { combineReducers } from "@reduxjs/toolkit"
import searchReducer from "../features/search/searchSlice"
import citiesReducer from "../features/cities/citiesSlice"

export default combineReducers({
  search: searchReducer,
  cities: citiesReducer,
})

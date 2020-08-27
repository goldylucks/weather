import { combineReducers } from "@reduxjs/toolkit"
import searchReducer from "../features/search/searchSlice"
import citiesReducer from "../features/cities/citiesSlice"
import cityNotesReducer from "../features/cityNotes/cityNotesSlice"

export default combineReducers({
  search: searchReducer,
  cities: citiesReducer,
  cityNotes: cityNotesReducer,
})

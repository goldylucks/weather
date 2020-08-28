import { combineReducers } from "@reduxjs/toolkit"
import searchReducer from "../features/search/searchSlice"
import citiesReducer from "../features/cities/citiesSlice"
import cityNotesReducer from "../features/cityNotes/cityNotesSlice"
import userLocationReducer from "../features/userLocation/userLocationSlice"

export default combineReducers({
  search: searchReducer,
  cities: citiesReducer,
  cityNotes: cityNotesReducer,
  userLocation: userLocationReducer,
})

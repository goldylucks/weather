import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

import fetchCitiesService from "../../services/fetchCitiesService"

export const fetchList = createAsyncThunk("cities/fetchList", async (query) => {
  const result = query
    ? await fetchCitiesService.fetchList(query)
    : await fetchCitiesService.fetchDefaultList()

  if (result.some((r) => r.error)) {
    throw new Error(
      "There was an error processing your request, please try again"
    )
  }

  return result
})

export const fetchItem = createAsyncThunk("cities/fetchItem", async (id) => {
  const result = await fetchCitiesService.fetchItem(id)
  if (result.error) {
    throw new Error(
      "There was an error processing your request, please try again"
    )
  }
  return result
})

const citiesSlice = createSlice({
  name: "cities",
  initialState: {
    favorites: [],
    searchResults: [],
    isFetchingSearchResults: false,
    searchResultsError: "",
    cityDetails: {},
    isFetchingCity: false,
    fetchingCityError: "",
  },
  reducers: {
    removeFavorite: (state, action) => {
      const id = action.payload
      state.favorites = state.favorites.filter((city) => city.id !== id)
    },
    removeSearchResult: (state, action) => {
      const id = action.payload
      state.searchResults = state.searchResults.filter((city) => city.id !== id)
    },
    toggleFavorite: (state, action) => {
      const city = action.payload
      if (state.favorites.find((c) => c.id === city.id)) {
        state.favorites = state.favorites.filter((c) => c.id !== city.id)
      } else {
        state.favorites.push(city)
      }
    },
  },
  extraReducers: {
    [fetchList.pending]: (state) => {
      state.isFetchingSearchResults = true
      state.searchResultsError = ""
      state.searchResults = []
    },
    [fetchList.fulfilled]: (state, action) => {
      state.isFetchingSearchResults = false
      state.searchResults = action.payload
    },
    [fetchList.rejected]: (state, action) => {
      state.isFetchingSearchResults = false
      state.searchResultsError = action.error.message
    },
    [fetchItem.pending]: (state, action) => {
      state.isFetchingCity = true
      state.fetchingCityError = ""
    },
    [fetchItem.fulfilled]: (state, action) => {
      state.isFetchingCity = false
      state.cityDetails = action.payload
    },
    [fetchItem.rejected]: (state, action) => {
      state.isFetchingCity = false
      state.fetchingCityError = action.error.message
    },
  },
})

export const {
  toggleFavorite,
  removeSearchResult,
  removeFavorite,
} = citiesSlice.actions

export default citiesSlice.reducer

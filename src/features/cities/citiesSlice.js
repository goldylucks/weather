import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit"

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
    list: [],
    favoritesIds: [],
    isFetchingList: false,
    isFetchingItem: false,
    listError: "",
    itemError: "",
  },
  reducers: {
    removeCity: (state, action) => {
      const id = action.payload
      state.list = state.list.filter((item) => item.id !== id)
      if (state.favoritesIds.includes(id)) {
        state.favoritesIds = state.favoritesIds.filter((item) => item.id !== id)
      }
    },
    toggleFavorite: (state, action) => {
      const id = action.payload
      if (state.favoritesIds.includes(id)) {
        state.favoritesIds = state.favoritesIds.filter((fid) => fid !== id)
        return state
      } else {
        state.favoritesIds.push(id)
      }
    },
  },
  extraReducers: {
    [fetchList.pending]: (state) => {
      state.isFetchingList = true
      state.listError = ""
      state.list = state.list.filter((item) =>
        state.favoritesIds.includes(item.id)
      )
    },
    [fetchList.fulfilled]: (state, action) => {
      state.isFetchingList = false
      const favorites = state.list.filter((item) =>
        state.favoritesIds.includes(item.id)
      )
      let results = action.payload.filter(
        (r) => !state.favoritesIds.includes(r.id) // if a result's id is in favoriteIds, it's already in state.list as well
      )
      state.list = results.concat(favorites)
    },
    [fetchList.rejected]: (state, action) => {
      state.isFetchingList = false
      state.listError = action.error.message
    },
    [fetchItem.pending]: (state, action) => {
      state.isFetchingItem = true
      state.itemError = ""
    },
    [fetchItem.fulfilled]: (state, action) => {
      state.isFetchingItem = false
      state.cityDetails = action.payload
    },
    [fetchItem.rejected]: (state, action) => {
      state.isFetchingItem = false
      state.itemError = action.error.message
    },
  },
})

export const { toggleFavorite, removeCity } = citiesSlice.actions

export default citiesSlice.reducer

const selectList = (state) => state.cities.list
const selectFavoritesIds = (state) => state.cities.favoritesIds

export const selectFavorites = createSelector(
  [selectList, selectFavoritesIds],
  (list, favoriteIds) =>
    list
      .filter((city) => favoriteIds.includes(city.id))
      .sort(sortCitiesAlphabetically)
)

export const selectNonFavorites = createSelector(
  [selectList, selectFavoritesIds],
  (list, favoriteIds) =>
    list
      .filter((city) => !favoriteIds.includes(city.id))
      .sort(sortCitiesAlphabetically)
)

function sortCitiesAlphabetically(a, b) {
  if (a.name < b.name) {
    return -1
  }
  if (a.name > b.name) {
    return 1
  }
  return 0
}

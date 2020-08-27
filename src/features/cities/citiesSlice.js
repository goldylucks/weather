import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit"

import fetchListService from "./fetchListService"

export const fetchList = createAsyncThunk("cities/fetchList", async (query) => {
  if (!query) {
    return []
  }

  return await fetchListService.fetchList(query)
})

const citiesSlice = createSlice({
  name: "cities",
  initialState: {
    list: [],
    favoritesIds: [],
  },
  reducers: {
    addFavorite: (state, action) => {
      const id = action.payload
      state.favoritesIds.push(id)
    },
    removeFavorite: (state, action) => {
      const id = action.payload
      state.favoritesIds = state.favoritesIds.filter((f) => f.id !== id)
    },
  },
  extraReducers: {
    [fetchList.pending]: (state) => {
      state.list = state.list.filter((item) =>
        state.favoritesIds.includes(item.id)
      )
    },
    [fetchList.fulfilled]: (state, action) => {
      let results = action.payload.filter(
        (r) => !state.favoritesIds.includes(r.id)
      ) // if a result's id is in favoriteIds, it's already in state.list as well
      state.list = results
    },
  },
})

export const { addFavorite, removeFavorite } = citiesSlice.actions

export default citiesSlice.reducer

const selectList = (state) => state.cities.list
const selectFavoritesIds = (state) => state.cities.favoritesIds

export const selectFavorites = createSelector(
  [selectList, selectFavoritesIds],
  (list, favoriteIds) =>
    list.filter((city) => favoriteIds.includes(city.id)).sort()
)

export const selectNonFavorites = createSelector(
  [selectList, selectFavoritesIds],
  (list, favoriteIds) =>
    list.filter((city) => !favoriteIds.includes(city.id)).sort()
)

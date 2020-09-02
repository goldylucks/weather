import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import fetchCitiesService from "../../services/fetchCitiesService"

export const fetchWeather = createAsyncThunk(
  "userLocation/fetchWeather",
  async ({ lat, lng }) => {
    const result = await fetchCitiesService.fetchUserLocationItem({ lat, lng })
    if (result.error) {
      throw new Error(
        "There was an error processing your request, please try again"
      )
    }
    return result
  }
)

const userLocationSlice = createSlice({
  name: "userLocation",
  initialState: {
    id: "",
    isFetching: false,
    current: {},
    name: "",
    lat: "",
    lng: "",
    error: "",
  },
  reducers: {
    setCoords: (state, action) => {
      const { lat, lng } = action.payload
      state.lat = lat
      state.lng = lng
    },
  },
  extraReducers: {
    [fetchWeather.pending]: (state) => {
      state.isFetching = true
      state.error = ""
    },
    [fetchWeather.fulfilled]: (state, action) => {
      const { current, name, id } = action.payload
      state.isFetching = false
      state.current = current
      state.name = name
      state.id = id
    },
    [fetchWeather.rejected]: (state, action) => {
      state.isFetching = false
      state.error = action.error.message
    },
  },
})

export const { setCoords } = userLocationSlice.actions

export default userLocationSlice.reducer

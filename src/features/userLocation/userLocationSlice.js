import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { v4 as uuidv4 } from "uuid"
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
    id: uuidv4(),
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
      const { current, location } = action.payload
      state.isFetching = false
      state.current = current
      state.name = `${location.name}, ${location.country}`
    },
    [fetchWeather.rejected]: (state, action) => {
      state.isFetching = false
      state.error = action.error.message
    },
  },
})

export const { setCoords } = userLocationSlice.actions

export default userLocationSlice.reducer

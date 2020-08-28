import React, { useEffect, useState } from "react"
import { Link } from "@reach/router"

import Container from "../../components/Container"
import WeatherDetails from "../../components/WeatherDetails"
import { useSelector, useDispatch } from "react-redux"
import {
  fetchWeather,
  setCoords,
} from "../../features/userLocation/userLocationSlice"

const UserLocationPage = () => {
  const dispatch = useDispatch()
  // const [gotPosition, setGotPosition] = useState(false)
  const { id, name, lat, current, isFetching, error } = useSelector(
    (state) => state.userLocation
  )

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      if (!position) {
        window.alert(
          "Please allow current location detection and refresh the page"
        )
        return
      }
      const { latitude, longitude } = position.coords
      dispatch(fetchWeather({ lat: latitude, lng: longitude }))
      dispatch(setCoords({ lat: latitude, lng: longitude }))
      // setGotPosition(true)
    })
  }, [dispatch])

  // happens when someone sends a direct link here to someone without
  // geolocation support
  if (!navigator.geolocation) {
    return (
      <Container>
        <Link to="/">Back to list</Link>
        <p>Your browser doesn't support detecting current location</p>
      </Container>
    )
  }

  if (error) {
    return <Container>{error}</Container>
  }

  if (isFetching || Object.keys(current).length === 0) {
    return <Container>Loading ...</Container>
  }

  if (!lat) {
    return <Container>Please allow current location detection</Container>
  }

  return (
    <Container>
      <div style={{ marginBottom: 20 }}>
        <Link to="/">Back to list</Link>
      </div>
      <h1>{name}</h1>
      <WeatherDetails {...current} />
      <h3 style={{ marginTop: 20, marginBottom: 10 }}>Notes</h3>
      {/* <div style={{ marginBottom: 20 }}>
        <CityNotes listId={id} />
      </div>
      <AddCityNote listId={id} /> */}
    </Container>
  )
}

export default UserLocationPage

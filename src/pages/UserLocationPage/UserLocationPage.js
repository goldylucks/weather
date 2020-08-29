import React, { useEffect, useState } from "react"
import { Link } from "@reach/router"

import useIsOnline from "../../hooks/useIsOnline"
import Container from "../../components/Container"
import WeatherDetails from "../../components/WeatherDetails"
import CityNotes from "../../features/cityNotes/CityNotes"
import AddCityNote from "../../features/cityNotes/AddCityNote"
import { useSelector, useDispatch } from "react-redux"
import {
  fetchWeather,
  setCoords,
} from "../../features/userLocation/userLocationSlice"

const UserLocationPage = () => {
  const isOnline = useIsOnline()
  const [isInitialRender, setIsInitialRender] = useState(true)
  const dispatch = useDispatch()
  const { id, name, lat, current, isFetching, error } = useSelector(
    (state) => state.userLocation
  )

  useEffect(() => {
    if (!navigator.geolocation) {
      return
    }

    if (!isOnline) {
      setIsInitialRender(false)
      return
    }

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
      setIsInitialRender(false)
    })
  }, [dispatch, isOnline])

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

  if (isFetching || isInitialRender || Object.keys(current).length === 0) {
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
      <h1 style={{ marginBottom: 10 }}>{name}</h1>
      <WeatherDetails {...current} />
      <h3 style={{ marginTop: 20, marginBottom: 10 }}>Notes</h3>
      <div style={{ marginBottom: 20 }}>
        <CityNotes listId={id} />
      </div>
      <AddCityNote listId={id} />
    </Container>
  )
}

export default UserLocationPage

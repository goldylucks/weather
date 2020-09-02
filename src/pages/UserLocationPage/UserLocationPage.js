import React, { useEffect, useState } from "react"

import useIsOnline from "../../hooks/useIsOnline"
import Container from "../../components/Container"
import WeatherDetails from "../../components/WeatherDetails"
import BackToList from "../../components/BackToList"
import Spinner from "../../components/Spinner"
import CityNotes from "../../features/cityNotes/CityNotes"
import AddCityNote from "../../features/cityNotes/AddCityNote"
import { useSelector, useDispatch } from "react-redux"
import {
  fetchWeather,
  setCoords,
} from "../../features/userLocation/userLocationSlice"
import useIsCityInFavorites from "../../hooks/useIsCityInFavorites"
import { faHeart } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { toggleFavorite } from "../../features/cities/citiesSlice"

const UserLocationPage = () => {
  const isCityInFavorites = useIsCityInFavorites()
  const isOnline = useIsOnline()
  const [isInitialRender, setIsInitialRender] = useState(true)
  const dispatch = useDispatch()
  const { id, name, lat, current, isFetching, error } = useSelector(
    (state) => state.userLocation
  )

  useEffect(() => {
    // happens when someone sends a direct link here to someone without
    // geolocation support
    if (!navigator.geolocation) {
      return
    }

    if (!isOnline) {
      setIsInitialRender(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude: lat, longitude: lng } = position.coords
        // getCityFromCoords(lat, lng)
        dispatch(fetchWeather({ lat, lng }))
        dispatch(setCoords({ lat, lng }))
        setIsInitialRender(false)
      },
      (error) => {
        // happens when someone sends a direct link here to someone
        // who declines location detection
        window.alert(
          "Please allow current location detection and refresh the page"
        )
      }
    )
  }, [dispatch, isOnline])

  // happens when someone sends a direct link here to someone without
  // geolocation support
  if (!navigator.geolocation) {
    return (
      <BackToList>
        <p>Your browser doesn't support detecting current location</p>
      </BackToList>
    )
  }

  const contents = (
    <div className="page">
      <BackToList />
      <Container>
        <div
          style={{
            marginBottom: 10,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1>{name}</h1>
          <FontAwesomeIcon
            onClick={() =>
              dispatch(
                toggleFavorite({
                  id,
                  name,
                  current,
                })
              )
            }
            icon={faHeart}
            style={{
              cursor: "pointer",
              color: isCityInFavorites(id) ? "#f7002b" : "inherit",
              fontSize: 24,
              transition: "color 0.6s",
            }}
          />
        </div>
        <WeatherDetails {...current} />
        <h3 style={{ marginTop: 20, marginBottom: 10 }}>Notes</h3>
        <div style={{ marginBottom: 20 }}>
          <CityNotes listId={id} />
        </div>
        <AddCityNote listId={id} />
      </Container>
    </div>
  )

  if (error) {
    return <BackToList>{error}</BackToList>
  }

  // return cached contents
  if (!isOnline && name) {
    return contents
  }

  // no cached contents
  if (!isOnline && !name) {
    return (
      <BackToList>
        <p>Can't fetch details about your location when you're offline</p>
      </BackToList>
    )
  }

  if (isFetching || isInitialRender || !name) {
    return <Spinner />
  }

  if (!lat) {
    return <BackToList>Please allow current location detection</BackToList>
  }

  return contents
}

export default UserLocationPage

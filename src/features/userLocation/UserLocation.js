import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { navigate } from "@reach/router"
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { setCoords } from "./userLocationSlice"

const UserLocation = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    if (!navigator.geolocation) {
      return
    }
    navigator.geolocation.getCurrentPosition((position) => {
      if (!position) {
        return
      }
      const { latitude, longitude } = position.coords
      dispatch(setCoords({ lat: latitude, lng: longitude }))
      if (window.location.pathname === "/user-location") {
        return
      }
      const shouldNavigate = window.confirm(
        "navigate to a page of your current location?"
      )
      if (shouldNavigate) {
        navigate("/user-location")
      }
    })
  }, [dispatch])
  const handleClick = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      if (!position) {
        window.alert("Please allow current location detection")
        return
      }
      const { latitude, longitude } = position.coords
      dispatch(setCoords({ lat: latitude, lng: longitude }))
      if (window.location.pathname === "/user-location") {
        return
      }
      navigate("/user-location")
    })
  }

  if (!navigator.geolocation) {
    return null
  }

  return (
    <a onClick={handleClick} style={{ display: "flex", fontSize: "0.8em" }}>
      My <FontAwesomeIcon icon={faMapMarkerAlt} style={{ marginLeft: 4 }} />
    </a>
  )
}

export default UserLocation

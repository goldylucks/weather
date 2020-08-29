import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { navigate } from "@reach/router"
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { setIsInnerPagesSearchModalOpen } from "../search/searchSlice"

const UserLocation = () => {
  const dispatch = useDispatch()
  const { isInnerPagesSearchModalOpen } = useSelector((state) => state.search)
  const { lat } = useSelector((state) => state.userLocation)
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      return
    }
    if (!navigator.geolocation) {
      return
    }
    if (window.location.pathname === "/user-location") {
      return
    }
    navigator.geolocation.getCurrentPosition((position) => {
      if (!position) {
        return
      }
      // if lat is not present, it's the first time user has granted location
      // detection, so we navigate to user location page. If lat is present,
      // we could get here from refreshing any of the pages, or by opening
      // the app. Navigating the user then is bad UX
      if (!lat) {
        navigate("/user-location")
      }
    })
  }, [lat])

  const handleClick = () => {
    if (isInnerPagesSearchModalOpen) {
      dispatch(setIsInnerPagesSearchModalOpen(false))
    }
    if (window.location.pathname === "/user-location") {
      return
    }
    navigator.geolocation.getCurrentPosition((position) => {
      if (!position) {
        window.alert("Please allow current location detection")
        return
      }
      navigate("/user-location")
    })
  }

  if (!navigator.geolocation) {
    return null
  }

  return (
    <a
      onClick={handleClick}
      style={{ display: "flex", fontSize: "0.8em", opacity: 0.5 }}
    >
      My <FontAwesomeIcon icon={faMapMarkerAlt} style={{ marginLeft: 4 }} />
    </a>
  )
}

export default UserLocation

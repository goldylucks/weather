import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { navigate } from "@reach/router"
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { setIsInnerPagesSearchModalOpen } from "../search/searchSlice"

const UserLocation = () => {
  const dispatch = useDispatch()
  const { isInnerPagesSearchModalOpen } = useSelector((state) => state.search)

  const handleClick = () => {
    if (isInnerPagesSearchModalOpen) {
      dispatch(setIsInnerPagesSearchModalOpen(false))
    }
    if (window.location.pathname === "/user-location") {
      return
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        navigate("/user-location")
      },
      (error) => {
        window.alert("location detection failed")
      }
    )
  }

  if (!navigator.geolocation) {
    return null
  }

  return (
    <button
      className="button-link"
      onClick={handleClick}
      style={{ display: "flex", fontSize: "0.8em", opacity: 0.5 }}
    >
      My <FontAwesomeIcon icon={faMapMarkerAlt} style={{ marginLeft: 4 }} />
    </button>
  )
}

export default UserLocation

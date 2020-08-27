import React, { useRef, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { navigate } from "@reach/router"

import Container from "../../components/Container"
import styles from "./SearchTopBar.module.css"
import { setQuery } from "./searchSlice"
import { fetchList } from "../cities/citiesSlice"

const SearchTopBar = () => {
  const timeoutRef = useRef()
  const value = useSelector((state) => state.search.query)
  const dispatch = useDispatch()

  useEffect(() => {
    clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      dispatch(fetchList(value))
    }, 150)
  }, [dispatch, value])

  // useEffect(() => {
  //   if (!navigator.geolocation) {
  //     return
  //   }
  //   navigator.geolocation.getCurrentPosition((position) => {
  //     if (!position) {
  //       return
  //     }
  //     const { latitude, longitude } = position
  //     dispatch(gotUserCoords({ lat: latitude, lng: longitude }))
  //     navigate("/user")
  //   })
  // }, [dispatch])

  const handleChange = (evt) => {
    if (window.location.pathname !== "/") {
      navigate("/")
    }

    dispatch(setQuery(evt.target.value))
  }

  return (
    <div className={styles.topbar}>
      <Container>
        <input
          value={value}
          onChange={handleChange}
          placeholder="Search cities"
          className={styles.input}
        />
      </Container>
    </div>
  )
}

export default SearchTopBar

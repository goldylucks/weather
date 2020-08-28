import React, { useRef, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { navigate } from "@reach/router"

import UserLocation from "../userLocation/UserLocation"
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

  const handleChange = (evt) => {
    if (window.location.pathname !== "/") {
      navigate("/")
    }

    dispatch(setQuery(evt.target.value))
  }

  return (
    <div className={styles.topbar}>
      <Container>
        <div style={{ display: "flex" }}>
          <input
            value={value}
            onChange={handleChange}
            placeholder="Search cities"
            className={styles.input}
          />
          <UserLocation />
        </div>
      </Container>
    </div>
  )
}

export default SearchTopBar

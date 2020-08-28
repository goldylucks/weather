import React, { useRef, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

import UserLocation from "../userLocation/UserLocation"
import Container from "../../components/Container"
import styles from "./SearchTopBar.module.css"
import { setQuery, setIsModalOpen } from "./searchSlice"
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
    dispatch(setQuery(evt.target.value))
  }

  const handleFocus = () => {
    if (window.location.pathname !== "/") {
      dispatch(setIsModalOpen(true))
    }
  }

  return (
    <div className={styles.topbar}>
      <Container>
        <div style={{ display: "flex" }}>
          <input
            onFocus={handleFocus}
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

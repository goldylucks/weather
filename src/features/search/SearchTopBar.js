import React, { useRef } from "react"
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

  const handleChange = (evt) => {
    if (window.location.pathname !== "/") {
      navigate("/")
    }
    evt.persist()
    // redirect to homepage if not already on it
    dispatch(setQuery(evt.target.value))
    clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      dispatch(fetchList(evt.target.value))
    }, 150)
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

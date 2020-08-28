import React, { useRef, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { navigate } from "@reach/router"

import UserLocation from "../userLocation/UserLocation"
import Container from "../../components/Container"
import styles from "./SearchTopBar.module.css"
import { setQuery, setInFocus } from "./searchSlice"
import { fetchList } from "../cities/citiesSlice"

const SearchTopBar = () => {
  const inputEl = useRef(null)
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

  return (
    <div className={styles.topbar}>
      <Container>
        <div style={{ display: "flex" }}>
          <input
            onFocus={() => dispatch(setInFocus(true))}
            onBlur={() => dispatch(setInFocus(false))}
            ref={inputEl}
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

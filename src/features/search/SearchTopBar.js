import React, { useRef, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import PropTypes from "prop-types"
import cx from "classnames"

import useIsOnline from "../../hooks/useIsOnline"
import UserLocation from "../userLocation/UserLocation"
import Container from "../../components/Container"
import styles from "./SearchTopBar.module.css"
import { setQuery, setIsInnerPagesSearchModalOpen } from "./searchSlice"
import { fetchList } from "../cities/citiesSlice"
import useDebounce from "../../hooks/useDebounce"

const SearchTopBar = ({ onMount }) => {
  const isOnline = useIsOnline()
  const isInitialRender = useRef(true)
  const { query } = useSelector((state) => state.search)
  const dispatch = useDispatch()
  const debouncedFetchList = useDebounce(() => {
    dispatch(fetchList(query))
  }, 150)

  useEffect(() => {
    if (isInitialRender.current) {
      onMount()
      if (isOnline) {
        dispatch(fetchList(query))
      }
      isInitialRender.current = false
      return
    }
    if (!isOnline) {
      return
    }
    debouncedFetchList()

    // adding dispatch or onMount as dependencies cause a rerender when
    // app switching between online and offline and vice versa
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  const handleChange = (evt) => {
    dispatch(setQuery(evt.target.value))
  }

  const handleFocus = () => {
    if (window.location.pathname !== "/") {
      dispatch(setIsInnerPagesSearchModalOpen(true))
    }
  }

  return (
    <div className={styles.topbar}>
      <Container>
        <div style={{ display: "flex" }}>
          {isOnline ? (
            <input
              onFocus={handleFocus}
              value={query}
              onChange={handleChange}
              placeholder="Search cities"
              className={styles.input}
            />
          ) : (
            <input
              readOnly
              value=""
              placeholder="Search disabled offline"
              className={cx(styles.input, styles["is-offline"])}
            />
          )}

          <UserLocation />
        </div>
      </Container>
    </div>
  )
}

SearchTopBar.propTypes = {
  onMount: PropTypes.func.isRequired,
}

export default SearchTopBar

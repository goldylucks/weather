import React from "react"
import { useSelector, useDispatch } from "react-redux"

import Cities from "../../features/cities/Cities"
import Spinner from "../Spinner"

import Container from "../Container"

import styles from "./SearchResultsModalForInnerPages.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes } from "@fortawesome/free-solid-svg-icons"
import { setIsInnerPagesSearchModalOpen } from "../../features/search/searchSlice"
import useCloseSearchModalOnEscape from "../../hooks/useCloseSearchModalOnEscape"

const SearchResultsModalForInnerPages = () => {
  const {
    favorites,
    searchResults,
    isFetchingSearchResults,
    searchResultsError,
  } = useSelector((state) => state.cities)
  const { isInnerPagesSearchModalOpen, query } = useSelector(
    (state) => state.search
  )
  const dispatch = useDispatch()

  useCloseSearchModalOnEscape()

  if (!isInnerPagesSearchModalOpen) {
    return null
  }

  let inner
  if (isFetchingSearchResults) {
    inner = <Spinner />
  } else if (searchResultsError) {
    inner = searchResultsError
  } else if (searchResults.length === 0) {
    inner = "No cities found"
  }

  return (
    <div className={styles.modal}>
      <Container>
        <div style={{ position: "relative" }}>
          <FontAwesomeIcon
            onClick={() => dispatch(setIsInnerPagesSearchModalOpen(false))}
            icon={faTimes}
            className={styles.close}
          />
        </div>
        <Cities title="Favorites" isFavorites cities={favorites} />
        {favorites.length > 0 && <hr style={{ margin: 30 }} />}
        <Cities
          title={query ? "Search Results" : "Largest cities by population"}
          cities={searchResults}
        />
        {inner}
      </Container>
    </div>
  )
}

export default SearchResultsModalForInnerPages

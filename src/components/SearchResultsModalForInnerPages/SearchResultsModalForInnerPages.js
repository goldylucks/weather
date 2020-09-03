import React from "react"
import { useSelector, useDispatch } from "react-redux"

import Cities from "../../features/cities/Cities"
import Spinner from "../Spinner"

import Container from "../Container"
import { CSSTransition } from "react-transition-group"

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

  let searchResultsInner
  if (isFetchingSearchResults) {
    searchResultsInner = <Spinner />
  } else if (searchResultsError) {
    searchResultsInner = searchResultsError
  } else if (searchResults.length === 0) {
    searchResultsInner = "No cities found"
  }

  return (
    <CSSTransition
      in={isInnerPagesSearchModalOpen}
      unmountOnExit
      timeout={600}
      classNames={{ ...styles }}
    >
      <div className={styles.modal}>
        <Container>
          <div style={{ position: "relative" }}>
            <FontAwesomeIcon
              onClick={() => dispatch(setIsInnerPagesSearchModalOpen(false))}
              icon={faTimes}
              className={styles.close}
            />
          </div>
          <Cities isInModal title="Favorites" isFavorites cities={favorites} />
          {favorites.length > 0 && <hr style={{ margin: 30 }} />}
          <Cities
            isInModal
            title={query ? "Search Results" : "Largest cities by population"}
            cities={searchResults}
          />
          {searchResultsInner}
        </Container>
      </div>
    </CSSTransition>
  )
}

export default SearchResultsModalForInnerPages

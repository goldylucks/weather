import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

import Cities from "../../features/cities/Cities"
import {
  selectFavorites,
  selectNonFavorites,
} from "../../features/cities/citiesSlice"

import Container from "../Container"

import styles from "./SearchResultsModalForInnerPages.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes } from "@fortawesome/free-solid-svg-icons"
import { setIsInnerPagesSearchModalOpen } from "../../features/search/searchSlice"
import useCloseSearchModalOnEscape from "../../hooks/useCloseSearchModalOnEscape"

const SearchResultsModalForInnerPages = () => {
  const favoriteCities = useSelector(selectFavorites)
  const nonFavoriteCities = useSelector(selectNonFavorites)
  const { listError, isFetchingList } = useSelector((state) => state.cities)
  const { isInnerPagesSearchModalOpen } = useSelector((state) => state.search)
  const dispatch = useDispatch()

  useCloseSearchModalOnEscape()

  if (!isInnerPagesSearchModalOpen) {
    return null
  }

  let searchResults
  if (listError) {
    searchResults = <Container>{listError}</Container>
  } else if (isFetchingList) {
    searchResults = <Container>Loading ...</Container>
  } else if (nonFavoriteCities.length === 0) {
    searchResults = <Container>No cities found</Container>
  } else {
    searchResults = <Cities title="Search Results" cities={nonFavoriteCities} />
  }

  return (
    <div className={styles.modal}>
      <Container>
        <Cities title="Favorites" isFavorites cities={favoriteCities} />
        {favoriteCities.length > 0 && <hr style={{ margin: 30 }} />}
        {searchResults}
        <FontAwesomeIcon
          onClick={() => dispatch(setIsInnerPagesSearchModalOpen(false))}
          icon={faTimes}
          className={styles.close}
        />
      </Container>
    </div>
  )
}

export default SearchResultsModalForInnerPages

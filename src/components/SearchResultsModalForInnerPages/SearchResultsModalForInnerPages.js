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

const SearchResultsModalForInnerPages = () => {
  const favoriteCities = useSelector(selectFavorites)
  const nonFavoriteCities = useSelector(selectNonFavorites)
  const { listError, isFetchingList } = useSelector((state) => state.cities)
  const { isInnerPagesSearchModalOpen } = useSelector((state) => state.search)
  const dispatch = useDispatch()

  const closeOnEscape = (evt) => {
    if (evt.which === 27) {
      dispatch(setIsInnerPagesSearchModalOpen(false))
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", closeOnEscape)
    return () => window.addEventListener("keydown", closeOnEscape)
  })

  if (!isInnerPagesSearchModalOpen) {
    return null
  }

  let inner
  if (listError) {
    inner = <Container>{listError}</Container>
  }

  if (isFetchingList) {
    inner = <Container>Loading ...</Container>
  }

  inner = (
    <Container>
      <Cities title="Favorites" isFavorites cities={favoriteCities} />
      {favoriteCities.length > 0 && nonFavoriteCities.length > 0 && (
        <hr style={{ margin: 30 }} />
      )}
      <Cities title="Search Results" cities={nonFavoriteCities} />
    </Container>
  )

  return (
    <div className={styles.modal}>
      {inner}
      <FontAwesomeIcon
        onClick={() => dispatch(setIsInnerPagesSearchModalOpen(false))}
        icon={faTimes}
        className={styles.close}
      />
    </div>
  )
}

export default SearchResultsModalForInnerPages

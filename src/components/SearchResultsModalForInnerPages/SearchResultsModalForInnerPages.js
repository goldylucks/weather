import React from "react"
import { useSelector } from "react-redux"

import Cities from "../../features/cities/Cities"
import {
  selectFavorites,
  selectNonFavorites,
} from "../../features/cities/citiesSlice"

import Container from "../Container"

import styles from "./SearchResultsModalForInnerPages.module.css"

const SearchResultsModalForInnerPages = () => {
  const favoriteCities = useSelector(selectFavorites)
  const nonFavoriteCities = useSelector(selectNonFavorites)
  const { listError, isFetchingList } = useSelector((state) => state.cities)
  const isSearchInputInFocus = useSelector((state) => state.search.inFocus)
  const isHomepage = window.location.pathname === "/"

  if (!isSearchInputInFocus || isHomepage) {
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
      <Cities title="Favorites" cities={favoriteCities} />
      {favoriteCities.length > 0 && nonFavoriteCities.length > 0 && (
        <hr style={{ margin: 30 }} />
      )}
      <Cities title="Search Results" cities={nonFavoriteCities} />
    </Container>
  )

  return <div className={styles.modal}>{inner}</div>
}

export default SearchResultsModalForInnerPages

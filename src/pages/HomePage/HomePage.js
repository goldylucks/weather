import React, { useEffect, useRef } from "react"

import Cities from "../../features/cities/Cities"
import { useSelector, useDispatch } from "react-redux"
import {
  selectFavorites,
  selectNonFavorites,
} from "../../features/cities/citiesSlice"
import Container from "../../components/Container"

const HomePage = () => {
  const isInitialRender = useRef(true)
  const favoriteCities = useSelector(selectFavorites)
  const nonFavoriteCities = useSelector(selectNonFavorites)
  const { listError, isFetchingList } = useSelector((state) => state.cities)
  const dispatch = useDispatch()

  useEffect(() => {
    // prevent flickering of no cities found
    if (isInitialRender.current) {
      isInitialRender.current = false
    }
  }, [dispatch])

  let searchResults
  if (listError) {
    searchResults = <Container>{listError}</Container>
  } else if (isFetchingList || isInitialRender.current) {
    searchResults = <Container>Loading ...</Container>
  } else if (nonFavoriteCities.length === 0) {
    searchResults = <Container>No cities found</Container>
  } else {
    searchResults = <Cities title="Search Results" cities={nonFavoriteCities} />
  }

  return (
    <Container>
      <Cities title="Favorites" isFavorites cities={favoriteCities} />
      {favoriteCities.length > 0 && <hr style={{ margin: 30 }} />}
      {searchResults}
    </Container>
  )
}

export default HomePage

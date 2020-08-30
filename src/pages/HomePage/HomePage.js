import React from "react"

import Cities from "../../features/cities/Cities"
import { useSelector } from "react-redux"
import {
  selectFavorites,
  selectNonFavorites,
} from "../../features/cities/citiesSlice"
import Container from "../../components/Container"
import Spinner from "../../components/Spinner"

const HomePage = () => {
  const favoriteCities = useSelector(selectFavorites)
  const nonFavoriteCities = useSelector(selectNonFavorites)
  const { listError, isFetchingList } = useSelector((state) => state.cities)
  const { query } = useSelector((state) => state.search)

  let searchResults
  if (listError) {
    searchResults = <Container>{listError}</Container>
  } else if (isFetchingList) {
    searchResults = <Spinner />
  } else if (nonFavoriteCities.length === 0) {
    searchResults = <Container>No cities found</Container>
  } else {
    searchResults = (
      <Cities
        title={query ? "Search Results" : "Largest cities by population"}
        cities={nonFavoriteCities}
      />
    )
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

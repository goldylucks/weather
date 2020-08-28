import React from "react"

import Cities from "../../features/cities/Cities"
import { useSelector } from "react-redux"
import {
  selectFavorites,
  selectNonFavorites,
} from "../../features/cities/citiesSlice"
import Container from "../../components/Container"

const HomePage = () => {
  const favoriteCities = useSelector(selectFavorites)
  const nonFavoriteCities = useSelector(selectNonFavorites)
  const { listError, isFetchingList } = useSelector((state) => state.cities)

  let searchResults
  if (listError) {
    searchResults = <Container>{listError}</Container>
  } else if (isFetchingList) {
    searchResults = <Container>Loading ...</Container>
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

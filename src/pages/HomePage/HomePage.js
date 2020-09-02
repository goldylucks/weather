import React from "react"

import Cities from "../../features/cities/Cities"
import { useSelector } from "react-redux"
import Container from "../../components/Container"
import Spinner from "../../components/Spinner"

const HomePage = () => {
  const {
    favorites,
    searchResults,
    isFetchingSearchResults,
    searchResultsError,
  } = useSelector((state) => state.cities)
  const { query } = useSelector((state) => state.search)

  let inner
  if (isFetchingSearchResults) {
    inner = <Spinner />
  } else if (searchResultsError) {
    inner = searchResultsError
  } else if (searchResults.length === 0) {
    inner = "No cities found"
  }

  return (
    <div className="page">
      <Container>
        <Cities
          title={query ? "Search Results" : "Largest cities by population"}
          cities={searchResults}
        />
        {inner}
        {favorites.length > 0 && <hr style={{ margin: 30 }} />}
        <Cities title="Favorites" isFavorites cities={favorites} />
      </Container>
    </div>
  )
}

export default HomePage

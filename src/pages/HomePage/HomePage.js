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

  let inner
  if (isFetchingList) {
    inner = <Spinner />
  } else if (listError) {
    inner = listError
  } else if (nonFavoriteCities.length === 0) {
    inner = "No cities found"
  }

  return (
    <div className="page">
      <Container>
        <Cities title="Favorites" isFavorites cities={favoriteCities} />
        {favoriteCities.length > 0 && <hr style={{ margin: 30 }} />}
        <Cities
          title={query ? "Search Results" : "Largest cities by population"}
          cities={nonFavoriteCities}
        />
        {inner}
      </Container>
    </div>
  )
}

export default HomePage

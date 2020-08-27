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

  return (
    <div className="page-container">
      <Container>
        <Cities title="Favorites" cities={favoriteCities} />
        {favoriteCities.length > 0 && nonFavoriteCities.length > 0 && (
          <hr style={{ margin: 30 }} />
        )}
        <Cities title="Search Results" cities={nonFavoriteCities} />
      </Container>
    </div>
  )
}

export default HomePage

import React, { useEffect, useRef, useState } from "react"

import Cities from "../../features/cities/Cities"
import { useSelector, useDispatch } from "react-redux"
import {
  selectFavorites,
  selectNonFavorites,
} from "../../features/cities/citiesSlice"
import Container from "../../components/Container"

const HomePage = () => {
  // const [isInitialRender, setIsInitialRender] = useState(true)
  // console.log("homepage render isInitial", isInitialRender.current)
  const favoriteCities = useSelector(selectFavorites)
  const nonFavoriteCities = useSelector(selectNonFavorites)
  const { listError, isFetchingList } = useSelector((state) => state.cities)
  const dispatch = useDispatch()

  // useEffect(() => {
  //   setIsInitialRender(false)
  // }, [])

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
    <Container>
      <Cities title="Favorites" isFavorites cities={favoriteCities} />
      {favoriteCities.length > 0 && <hr style={{ margin: 30 }} />}
      {searchResults}
    </Container>
  )
}

export default HomePage

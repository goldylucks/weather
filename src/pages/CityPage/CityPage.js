import React, { useEffect } from "react"
import Container from "../../components/Container"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "@reach/router"
import { fetchItem } from "../../features/cities/citiesSlice"
import CityNotes from "../../features/cityNotes/CityNotes"
import AddCityNote from "../../features/cityNotes/AddCityNote"
import WeatherDetails from "../../components/WeatherDetails"

const CityPage = ({ cityId }) => {
  const dispatch = useDispatch()
  const { isFetchingItem, itemError } = useSelector((state) => state.cities)
  const city = useSelector((state) =>
    state.cities.list.find((city) => city.id === cityId)
  )

  // happens when opening a direct link without searching first
  // or on pressing the back button and landing here after
  // this city was removed from the search results and it's not in favorites
  useEffect(() => {
    if (!city) {
      dispatch(fetchItem(cityId))
    }
  }, [city, dispatch, cityId])

  if (itemError) {
    return <Container>{itemError}</Container>
  }

  if (isFetchingItem) {
    return <Container>Loading ...</Container>
  }

  return (
    <Container>
      <div style={{ marginBottom: 20 }}>
        <Link to="/">Back to list</Link>
      </div>
      <h1>{city.name}</h1>
      <WeatherDetails {...city.current} />
      <h3 style={{ marginTop: 20, marginBottom: 10 }}>Notes</h3>
      <div style={{ marginBottom: 20 }}>
        <CityNotes listId={cityId} />
      </div>
      <AddCityNote listId={cityId} />
    </Container>
  )
}

export default CityPage

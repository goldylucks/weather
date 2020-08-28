import React, { useEffect, useState } from "react"
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
  const city = useSelector(
    (state) =>
      state.cities.list.find((city) => city.id === cityId) ||
      (Object.keys(state.cities.cityDetails).length !== 0 &&
        state.cities.cityDetails)
  )

  useEffect(() => {
    if (!city || cityId !== city.id) {
      dispatch(fetchItem(cityId))
    }
  }, [dispatch, cityId, city])

  if (itemError) {
    return <Container>{itemError}</Container>
  }

  if (isFetchingItem || !city) {
    return <Container>Loading ...</Container>
  }

  console.log(city)

  return (
    <Container>
      <div style={{ marginBottom: 20 }}>
        <Link to="/">Back to list</Link>
      </div>
      <h1 style={{ marginBottom: 10 }}>{city.name}</h1>
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

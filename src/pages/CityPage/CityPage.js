import React, { useEffect } from "react"
import PropTypes from "prop-types"
import Container from "../../components/Container"
import { useSelector, useDispatch } from "react-redux"
import { fetchItem } from "../../features/cities/citiesSlice"
import CityNotes from "../../features/cityNotes/CityNotes"
import AddCityNote from "../../features/cityNotes/AddCityNote"
import WeatherDetails from "../../components/WeatherDetails"
import BackToList from "../../components/BackToList"
import Spinner from "../../components/Spinner"

const CityPage = ({ cityId }) => {
  const dispatch = useDispatch()
  const { isFetchingItem, itemError } = useSelector((state) => state.cities)
  const city = useSelector(
    (state) =>
      state.cities.list.find((city) => city.id === cityId) ||
      // if city is not in list, check if it's in city details
      // this happens when opening a direct link to a city
      (state.cities.cityDetails.name && state.cities.cityDetails)
  )

  useEffect(() => {
    if (!city || cityId !== city.id) {
      dispatch(fetchItem(cityId))
    }
  }, [dispatch, cityId, city])

  if (itemError) {
    return <BackToList>{itemError}</BackToList>
  }

  if (isFetchingItem || !city) {
    return <Spinner />
  }

  return (
    <div>
      <BackToList />
      <Container>
        <h1 style={{ marginBottom: 10 }}>{city.name}</h1>
        <WeatherDetails {...city.current} />
        <h3 style={{ marginTop: 20, marginBottom: 10 }}>Notes</h3>
        <div style={{ marginBottom: 20 }}>
          <CityNotes listId={cityId} />
        </div>
        <AddCityNote listId={cityId} />
      </Container>
    </div>
  )
}

CityPage.propTypes = {
  cityId: PropTypes.string,
}

export default CityPage

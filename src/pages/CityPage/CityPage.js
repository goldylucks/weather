import React, { useEffect } from "react"
import PropTypes from "prop-types"
import Container from "../../components/Container"
import { useSelector, useDispatch } from "react-redux"
import { faHeart } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { fetchItem, toggleFavorite } from "../../features/cities/citiesSlice"
import CityNotes from "../../features/cityNotes/CityNotes"
import AddCityNote from "../../features/cityNotes/AddCityNote"
import WeatherDetails from "../../components/WeatherDetails"
import BackToList from "../../components/BackToList"
import Spinner from "../../components/Spinner"
import useIsCityInFavorites from "../../hooks/useIsCityInFavorites"

const CityPage = ({ cityId }) => {
  const isCityInFavorites = useIsCityInFavorites()
  const dispatch = useDispatch()
  const { isFetchingCity, fetchingCityError } = useSelector(
    (state) => state.cities
  )
  const city = useSelector(
    (state) =>
      state.cities.searchResults.find((city) => city.id === cityId) ||
      // if city is not in list, check if it's in city details
      // this happens when opening a direct link to a city
      (state.cities.cityDetails.name && state.cities.cityDetails)
  )

  useEffect(() => {
    if (!city || cityId !== city.id) {
      dispatch(fetchItem(cityId))
    }
  }, [dispatch, cityId, city])

  if (fetchingCityError) {
    return <BackToList>{fetchingCityError}</BackToList>
  }

  if (isFetchingCity || !city) {
    return <Spinner />
  }

  return (
    <div className="page">
      <BackToList />
      <Container>
        <div
          style={{
            marginBottom: 10,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1>{city.name}</h1>
          <FontAwesomeIcon
            onClick={() => dispatch(toggleFavorite(city.id))}
            icon={faHeart}
            style={{
              cursor: "pointer",
              color: isCityInFavorites(city.id) ? "#f7002b" : "inherit",
              fontSize: 24,
              transition: "color 0.6s",
            }}
          />
        </div>
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

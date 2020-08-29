import React from "react"
import { faTrashAlt, faHeart } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import PropTypes from "prop-types"

import { removeCity, toggleFavorite } from "./citiesSlice"
import styles from "./Cities.module.css"
import { useDispatch, useSelector } from "react-redux"
import { navigate } from "@reach/router"
import { setIsInnerPagesSearchModalOpen } from "../search/searchSlice"

const Cities = ({ cities, title, isFavorites }) => {
  const dispatch = useDispatch()
  const { isInnerPagesSearchModalOpen } = useSelector((state) => state.search)

  const handleClick = (cityId) => {
    if (isInnerPagesSearchModalOpen) {
      dispatch(setIsInnerPagesSearchModalOpen(false))
    }
    navigate(`/city/${cityId}`)
  }

  const renderCity = (city) => (
    <div key={city.id} className={styles.city}>
      <button className="button-link" onClick={() => handleClick(city.id)}>
        {city.name}
      </button>
      <span className={styles.temperature}>{city.current.temperature}°</span>
      <div className={styles.actions}>
        <span onClick={() => dispatch(toggleFavorite(city.id))}>
          <FontAwesomeIcon
            icon={faHeart}
            style={{ color: isFavorites ? "#f7002b" : "inherit" }}
          />
        </span>
        <span onClick={() => dispatch(removeCity(city.id))}>
          <FontAwesomeIcon icon={faTrashAlt} />
        </span>
      </div>
    </div>
  )

  if (cities.length === 0) {
    return null
  }

  return (
    <div>
      {title && <h3 className={styles.title}>{title}</h3>}
      {cities.map(renderCity)}
    </div>
  )
}

Cities.propTypes = {
  title: PropTypes.string.isRequired,
  isFavorites: PropTypes.bool,
  cities: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      current: PropTypes.shape({
        temperature: PropTypes.number.isRequired,
      }).isRequired,
    })
  ).isRequired,
}

export default Cities

import React from "react"
import { faTrashAlt, faHeart } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { removeCity, toggleFavorite } from "./citiesSlice"
import styles from "./Cities.module.css"
import { useDispatch } from "react-redux"

const Cities = ({ cities, title }) => {
  const dispatch = useDispatch()

  const renderCity = (city) => (
    <div key={city.id} className={styles.city}>
      <p>{city.name}</p>
      <span className={styles.temperature}>{city.current.temperature}°</span>
      <div className={styles.actions}>
        <span onClick={() => dispatch(toggleFavorite(city.id))}>
          <FontAwesomeIcon icon={faHeart} />
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

export default Cities

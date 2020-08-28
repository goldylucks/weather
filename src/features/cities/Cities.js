import React from "react"
import { faTrashAlt, faHeart } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

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
      <a onClick={() => handleClick(city.id)}>{city.name}</a>
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

export default Cities

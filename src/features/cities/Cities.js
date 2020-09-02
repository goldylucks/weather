import React from "react"
import { faTrashAlt, faHeart } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import PropTypes from "prop-types"
import cx from "classnames"
import sortBy from "lodash.sortby"

import { IS_MOBILE } from "../../constants/mobile"
import {
  removeFavorite,
  removeSearchResult,
  toggleFavorite,
} from "./citiesSlice"
import styles from "./Cities.module.css"
import { useDispatch, useSelector } from "react-redux"
import { navigate } from "@reach/router"
import { setIsInnerPagesSearchModalOpen } from "../search/searchSlice"
import useIsCityInFavorites from "../../hooks/useIsCityInFavorites"

const Cities = ({ cities, title, isFavorites, isInModal }) => {
  const isCityInFavorites = useIsCityInFavorites()
  const dispatch = useDispatch()
  const { isInnerPagesSearchModalOpen } = useSelector((state) => state.search)

  const handleClick = (cityId) => {
    if (isInnerPagesSearchModalOpen) {
      dispatch(setIsInnerPagesSearchModalOpen(false))
    }
    navigate(`/city/${cityId}`)
  }

  const renderCity = (city) => {
    const [name, ...region] = city.name.split(",")
    return (
      <div key={city.id} className={styles.city}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button className="button-link" onClick={() => handleClick(city.id)}>
            <h3>{name}</h3>
          </button>
          <span className={styles.temperature}>
            {city.current.temperature}°
          </span>
        </div>
        <small>{region.join(", ")}</small>
        <div
          className={cx(styles.actions, {
            [styles.isInModal]: isInModal,
            [styles["is-mobile"]]: IS_MOBILE,
          })}
        >
          <FontAwesomeIcon
            onClick={() => dispatch(toggleFavorite(city))}
            icon={faHeart}
            style={{
              color: isCityInFavorites(city.id) ? "#f7002b" : "inherit",
            }}
          />
          <FontAwesomeIcon
            onClick={() =>
              dispatch(
                isFavorites
                  ? removeFavorite(city.id)
                  : removeSearchResult(city.id)
              )
            }
            icon={faTrashAlt}
          />
        </div>
      </div>
    )
  }

  if (isFavorites && cities.length === 0) {
    return null
  }

  return (
    <div>
      <h1 className={styles.title}>{title}</h1>
      <div>{sortBy(cities, ["name"]).map(renderCity)}</div>
      <div style={{ clear: "both" }} />
    </div>
  )
}

Cities.propTypes = {
  title: PropTypes.string.isRequired,
  isFavorites: PropTypes.bool,
  isInModal: PropTypes.bool,
  cities: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      current: PropTypes.shape({
        temperature: PropTypes.number.isRequired,
      }).isRequired,
    }).isRequired
  ).isRequired,
}

export default Cities

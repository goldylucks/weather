import React from "react"

import styles from "./Cities.module.css"

const Cities = ({ cities, title }) => {
  const renderCity = (city) => (
    <div key={city.id} className={styles.city}>
      <p>{city.name}</p>
      <span className={styles.temperature}>{city.current.temperature}°</span>
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

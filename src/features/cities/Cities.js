import React from "react"

const Cities = ({ cities, title }) => {
  const renderCity = (city) => (
    <div key={city.id}>
      <p>{city.name}</p>
    </div>
  )

  if (cities.length === 0) {
    return null
  }

  return (
    <div>
      {title && <h3>{title}</h3>}
      {cities.map(renderCity)}
    </div>
  )
}

export default Cities

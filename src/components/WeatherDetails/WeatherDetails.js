import React from "react"
import PropTypes from "prop-types"

const WeatherDetails = ({
  temperature,
  weather_descriptions,
  wind_speed,
  wind_degree,
  wind_dir,
  humidity,
  feelslike,
}) => (
  <div>
    <p>
      {weather_descriptions.join(", ")} {temperature}°
    </p>
    <p>Feels like {feelslike}°</p>
    <p>Humidity {humidity}</p>
    <p>
      Wind {wind_speed}km/h, {wind_degree}°, {wind_dir}
    </p>
  </div>
)

WeatherDetails.propTypes = {
  temperature: PropTypes.number.isRequired,
  weather_descriptions: PropTypes.array.isRequired,
  wind_speed: PropTypes.number.isRequired,
  wind_degree: PropTypes.number.isRequired,
  wind_dir: PropTypes.string.isRequired,
  humidity: PropTypes.number.isRequired,
  feelslike: PropTypes.number.isRequired,
}

export default WeatherDetails

import React from "react"

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

export default WeatherDetails

export default function getCityFromCoords(lat, lng) {
  var geocoder = new window.google.maps.Geocoder()
  const location = {
    lat,
    lng,
  }

  return new Promise((resolve) => {
    geocoder.geocode({ location }, function (results, status) {
      resolve(results)
      if (status === "OK") {
        if (results[0]) {
          console.log(results)
        } else {
          window.alert("No results found")
        }
      } else {
        window.alert("Geocoder failed due to: " + status)
      }
    })
  })
}

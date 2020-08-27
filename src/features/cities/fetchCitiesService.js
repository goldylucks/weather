import largestCitiesByPopulation from "./largestCitiesByPopulation.json"

const fetchListService = (function () {
  const API_KEY = "d4e06617300d4859d13b9b341fdebb0f"
  const autocomplete = new window.google.maps.places.AutocompleteService()
  const places = new window.google.maps.places.PlacesService(
    document.querySelector("#dummy-for-google-places")
  )

  const promisifiedGetDetails = (placeId) =>
    new Promise((resolve) => {
      places.getDetails({ placeId }, (placeResult) => {
        resolve(placeResult)
      })
    })

  const promisifiedGetPlacePredictions = (query) =>
    new Promise((resolve) => {
      autocomplete.getPlacePredictions(
        { types: ["(cities)"], input: query },
        (predictions) => {
          resolve(predictions)
        }
      )
    })

  const fetchList = async (query) => {
    const places = await promisifiedGetPlacePredictions(query)
    console.log(places)
    const placesPromises = places.map((place) =>
      promisifiedGetDetails(place.place_id)
    )
    let details = await Promise.all(placesPromises)
    details = details.map((d) => [
      d.geometry.location.lat(),
      d.geometry.location.lng(),
    ])
    details = details.map(([lat, lng]) =>
      fetch(
        `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${lat},${lng}`
      )
    )
    details = await Promise.all(details)
    details = details.map((d) => d.json())
    details = await Promise.all(details)
    // The api service we use, weatherstack, has inaccurate names and no ids, so we
    // attach the names and ids from google places
    details = details.map((d, idx) => ({
      ...d,
      name: places[idx].description,
      id: places[idx].place_id,
    }))

    return details
  }

  const fetchItem = async (id) => {
    let details = await promisifiedGetDetails(id)
    const name = details.name
    const lng = details.geometry.location.lng()
    const lat = details.geometry.location.lat()
    details = await fetch(
      `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${lat},${lng}`
    )
    details = await details.json()
    return { ...details, id, name }
  }

  const fetchDefaultList = async () => {
    const fetches = largestCitiesByPopulation.map(({ lat, lng }) =>
      fetch(
        `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${lat},${lng}`
      )
    )
    let details = await Promise.all(fetches)
    details = details.map((d) => d.json())
    details = await Promise.all(details)
    // The api service we use, weatherstack, has inaccurate names and no ids, so we
    // attach the names and ids from google places
    details = details.map((d, idx) => ({
      ...d,
      name: largestCitiesByPopulation[idx].name,
      id: largestCitiesByPopulation[idx].id,
    }))
    return details
  }

  return { fetchList, fetchItem, fetchDefaultList }
})()

export default fetchListService

import largestCitiesByPopulation from "../features/cities/largestCitiesByPopulation.json"

const fetchListService = (function () {
  const API_KEY = "b46aae739e2962e88de88a2a425d1501"
  let googleAutocompleteService
  let googlePlacesService
  const getGoogleAutocompleteService = () => {
    if (!googleAutocompleteService) {
      googleAutocompleteService = new window.google.maps.places.AutocompleteService()
    }
    return googleAutocompleteService
  }
  const getGooglePlacesService = () => {
    if (!googlePlacesService) {
      googlePlacesService = new window.google.maps.places.PlacesService(
        document.querySelector("#dummy-for-google-places")
      )
    }
    return googlePlacesService
  }

  const fetchItemWeatherDetails = ({ lat, lng }) =>
    fetch(
      `https://api.weatherstack.com/current?access_key=${API_KEY}&query=${lat},${lng}`
    )

  const promisifiedGetGooglePlaceDetails = (googlePlaceId) =>
    new Promise((resolve) => {
      getGooglePlacesService().getDetails(
        { placeId: googlePlaceId },
        (placeResult) => {
          resolve(placeResult)
        }
      )
    })

  const promisifiedGetGooglePlacesPredictions = (query) =>
    new Promise((resolve) => {
      getGoogleAutocompleteService().getPlacePredictions(
        { types: ["(cities)"], input: query },
        (predictions) => {
          resolve(predictions)
        }
      )
    })

  const fetchList = async (query) => {
    const googlePlacesPredictions = await promisifiedGetGooglePlacesPredictions(
      query
    )
    if (googlePlacesPredictions === null) {
      return []
    }
    const getGooglePlacesDetailsPromises = googlePlacesPredictions.map(
      (place) => promisifiedGetGooglePlaceDetails(place.place_id)
    )
    let googlePlacesDetails = await Promise.all(getGooglePlacesDetailsPromises)
    googlePlacesDetails = googlePlacesDetails.map((d) => [
      d.geometry.location.lat(),
      d.geometry.location.lng(),
    ])
    const fetchItemsWeatherPromises = googlePlacesDetails.map(([lat, lng]) =>
      fetchItemWeatherDetails({ lat, lng })
    )
    const itemsWeatherResponses = await Promise.all(fetchItemsWeatherPromises)
    const itemsWeatherJsonsPromises = itemsWeatherResponses.map((d) => d.json())
    let itemsWeatherJsons = await Promise.all(itemsWeatherJsonsPromises)
    // The api service we use, weatherstack, has inaccurate names and no ids, so we
    // attach the names from google places. Attaching the ids from google places is
    // needed for deep linking a city page, i.e. /city/GOOGLE_PLACE_ID
    itemsWeatherJsons = itemsWeatherJsons.map((d, idx) => ({
      ...d,
      name: googlePlacesPredictions[idx].description,
      id: googlePlacesPredictions[idx].place_id,
    }))

    return itemsWeatherJsons
  }

  const fetchItem = async (googlePlaceId) => {
    const googlePlaceDetails = await promisifiedGetGooglePlaceDetails(
      googlePlaceId
    )
    const { name } = googlePlaceDetails
    const lng = googlePlaceDetails.geometry.location.lng()
    const lat = googlePlaceDetails.geometry.location.lat()
    const itemWeatherResponse = await fetchItemWeatherDetails({ lat, lng })
    const itemWeatherJson = await itemWeatherResponse.json()
    return { ...itemWeatherJson, id: googlePlaceId, name }
  }

  const fetchDefaultList = async () => {
    const fetchItemsWeatherPromises = largestCitiesByPopulation.map(
      ({ lat, lng }) => fetchItemWeatherDetails({ lat, lng })
    )
    const itemsWeatherResponses = await Promise.all(fetchItemsWeatherPromises)
    const itemsWeatherJsonsPromises = itemsWeatherResponses.map((d) => d.json())
    let itemsWeatherJsons = await Promise.all(itemsWeatherJsonsPromises)
    // The api service we use, weatherstack, has inaccurate names and no ids, so we
    // attach the names and ids from google places
    itemsWeatherJsons = itemsWeatherJsons.map((d, idx) => ({
      ...d,
      name: largestCitiesByPopulation[idx].name,
      id: largestCitiesByPopulation[idx].id,
    }))
    return itemsWeatherJsons
  }

  const fetchUserLocationItem = async ({ lat, lng }) => {
    let details = await fetchItemWeatherDetails({ lat, lng })
    details = await details.json()
    return details
  }

  return { fetchList, fetchItem, fetchDefaultList, fetchUserLocationItem }
})()

export default fetchListService

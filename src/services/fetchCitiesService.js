import largestCitiesByPopulation from "../features/cities/largestCitiesByPopulation.json"

const fetchCitiesService = (function () {
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
        { placeId: googlePlaceId, fields: ["formatted_address", "geometry"] },
        (placeResult, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            resolve(placeResult)
          } else {
            console.log(status)
          }
        }
      )
    })

  const promisifiedGetGooglePlacesPredictions = ({ query, lat, lng }) =>
    new Promise((resolve) => {
      const options = { types: ["(cities)"], input: query }
      if (lat && lng) {
        options.location = new window.google.maps.LatLng(lat, lng)
        options.radius = 1
      }
      getGoogleAutocompleteService().getPlacePredictions(
        options,
        (predictions) => {
          resolve(predictions)
        }
      )
    })

  const fetchSearchResults = async (query) => {
    const googlePlacesPredictions = await promisifiedGetGooglePlacesPredictions(
      { query }
    )
    if (googlePlacesPredictions === null) {
      return []
    }
    const promises = googlePlacesPredictions.map((place) =>
      fetchItem(place.place_id)
    )
    const responses = await Promise.all(promises)
    return responses.filter(Boolean)
  }

  const fetchItem = async (googlePlaceId) => {
    const googlePlaceDetails = await promisifiedGetGooglePlaceDetails(
      googlePlaceId
    )
    if (!googlePlaceDetails) {
      return
    }
    const { formatted_address: name } = googlePlaceDetails
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
    let weatherDetails = await fetchItemWeatherDetails({ lat, lng })
    weatherDetails = await weatherDetails.json()
    const predictions = await promisifiedGetGooglePlacesPredictions({
      lat,
      lng,
      query: weatherDetails.location.name,
    })
    const googlePlaceId = predictions[0].place_id
    const googlePlaceDetails = await promisifiedGetGooglePlaceDetails(
      googlePlaceId
    )
    return {
      ...weatherDetails,
      name: googlePlaceDetails.formatted_address,
      id: googlePlaceId,
    }
  }

  return {
    fetchSearchResults,
    fetchItem,
    fetchDefaultList,
    fetchUserLocationItem,
  }
})()

export default fetchCitiesService

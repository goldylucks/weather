import citiesReducer, {
  toggleFavorite,
  removeFavorite,
  fetchSearchResults,
} from "../citiesSlice"

describe("citiesReducer", () => {
  describe("removeFavorite", () => {
    it("should remove city from favorites", () => {
      // given
      const id = 1
      const state = {
        favorites: [{ id }],
      }
      // when
      const result = citiesReducer(state, removeFavorite(id))
      // then
      expect(result).toEqual({ favorites: [] })
    })
  })
  describe("toggleFavorite", () => {
    it("should add city to favorites", () => {
      // given
      const id = 1
      const city = { id }
      const state = {
        favorites: [],
      }
      // when
      const result = citiesReducer(state, toggleFavorite(city))
      // then
      expect(result).toEqual({ favorites: [city] })
    })
    it("should remove city from favorites", () => {
      // given
      const id = 1
      const city = { id }
      const state = {
        favorites: [city],
      }
      // when
      const result = citiesReducer(state, toggleFavorite(city))
      // then
      expect(result).toEqual({ favorites: [] })
    })
  })
  describe("fetchSearchResults", () => {
    it(".pending -> should remove previous results and set pending state", () => {
      // given
      const state = {
        searchResults: [{}, {}],
      }
      // when
      const result = citiesReducer(state, { type: fetchSearchResults.pending })
      // then
      expect(result).toEqual({
        isFetchingSearchResults: true,
        searchResultsError: "",
        searchResults: [],
      })
    })
    it(".fulfilled -> should set results", () => {
      // given
      const id = 1
      const state = {
        searchResults: [{ id }],
      }
      // when
      const result = citiesReducer(state, {
        type: fetchSearchResults.fulfilled,
        payload: [{ id }],
      })
      // then
      expect(result).toEqual({
        isFetchingSearchResults: false,
        searchResults: [{ id }],
      })
    })
  })
})

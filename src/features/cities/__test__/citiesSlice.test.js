import citiesReducer, {
  toggleFavorite,
  removeCity,
  fetchList,
} from "../citiesSlice"

describe("citiesReducer", () => {
  describe("removeCity", () => {
    it("should remove city from list and favoriteIds", () => {
      // given
      const id = 1
      const state = {
        list: [{ id }],
        favoritesIds: [id],
      }
      // when
      const result = citiesReducer(state, removeCity(id))
      // then
      expect(result).toEqual({ list: [], favoritesIds: [] })
    })
  })
  describe("toggleFavorite", () => {
    it("should add id to favoriteIds", () => {
      // given
      const id = 1
      const state = {
        favoritesIds: [],
      }
      // when
      const result = citiesReducer(state, toggleFavorite(id))
      // then
      expect(result).toEqual({ favoritesIds: [id] })
    })
    it("should remove id from favoriteIds", () => {
      // given
      const id = 1
      const state = {
        favoritesIds: [id],
      }
      // when
      const result = citiesReducer(state, toggleFavorite(id))
      // then
      expect(result).toEqual({ favoritesIds: [] })
    })
  })
  describe("fetchList", () => {
    it(".pending -> should remove non favorites cities from list and set pending state", () => {
      // given
      const id = 1
      const idToRemove = 2
      const state = {
        list: [{ id }, { id: idToRemove }],
        favoritesIds: [id],
      }
      // when
      const result = citiesReducer(state, { type: fetchList.pending })
      // then
      expect(result).toEqual({
        isFetchingList: true,
        listError: "",
        list: [{ id }],
        favoritesIds: [id],
      })
    })
    // it('fulfilled')
  })
})

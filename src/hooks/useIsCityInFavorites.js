import { useSelector } from "react-redux"

const useIsCityInFavorites = () => {
  const { favorites } = useSelector((state) => state.cities)
  return (id) => !!favorites.find((city) => city.id === id)
}

export default useIsCityInFavorites

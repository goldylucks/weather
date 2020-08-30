import useOnEscape from "./useOnEscape"
import { setIsInnerPagesSearchModalOpen } from "../features/search/searchSlice"
import { useDispatch, useSelector } from "react-redux"

const useCloseSearchModalOnEscape = () => {
  const dispatch = useDispatch()
  const { isInnerPagesSearchModalOpen } = useSelector((state) => state.search)

  useOnEscape(() => {
    if (isInnerPagesSearchModalOpen) {
      dispatch(setIsInnerPagesSearchModalOpen(false))
    }
  })
}

export default useCloseSearchModalOnEscape

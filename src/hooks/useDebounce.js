import { useRef } from "react"

const useDebounce = (fn, time) => {
  const timeoutRef = useRef()
  return () => {
    clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(fn, time)
  }
}

export default useDebounce

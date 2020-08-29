import { useRef } from "react"

const useComponentWillMount = (fn) => {
  const willMount = useRef(true)

  if (willMount.current) fn()

  willMount.current = false
}

export default useComponentWillMount

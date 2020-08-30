import { useEffect } from "react"

const useOnEscape = (fn) => {
  const onEscape = (evt) => {
    console.log(evt)
    if (evt.which === 27) {
      fn()
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", onEscape)
    return () => window.removeEventListener("keydown", onEscape)
  })
}
export default useOnEscape

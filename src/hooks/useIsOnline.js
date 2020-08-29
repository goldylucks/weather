import { useEffect, useState } from "react"

const useIsOnline = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine)

  const onOnline = () => setIsOnline(true)
  const onOffline = () => setIsOnline(false)

  useEffect(() => {
    window.addEventListener("online", onOnline)
    return () => window.removeEventListener("online", onOnline)
  }, [])

  useEffect(() => {
    window.addEventListener("offline", onOffline)
    return () => window.removeEventListener("offline", onOffline)
  }, [])

  return isOnline
}

export default useIsOnline

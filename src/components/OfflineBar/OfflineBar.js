import React from "react"
import useIsOnline from "../../hooks/useIsOnline"
import styles from "./OfflineBar.module.css"

const OfflineBar = () => {
  const isOnline = useIsOnline()

  if (isOnline) {
    return null
  }

  return <div className={styles.bar}>You are offline</div>
}

export default OfflineBar

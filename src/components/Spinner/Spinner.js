import React from "react"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import styles from "./Spinner.module.css"

const Spinner = () => (
  <FontAwesomeIcon icon={faSpinner} className={styles.spinner} />
)

export default Spinner

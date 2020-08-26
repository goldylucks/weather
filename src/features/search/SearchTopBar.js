import React from "react"

import Container from "../../components/Container"
import styles from "./SearchTopBar.module.css"

const SearchTopBar = () => (
  <div className={styles.topbar}>
    <Container>
      <input className={styles.input} />
    </Container>
  </div>
)

export default SearchTopBar

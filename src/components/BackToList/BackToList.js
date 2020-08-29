import React from "react"
import { Link } from "@reach/router"
import PropTypes from "prop-types"
import Container from "../Container"

const BackToList = ({ children }) => (
  <Container>
    <div style={{ marginBottom: 20 }}>
      <Link to="/">Back to list</Link>
    </div>
    {children}
  </Container>
)

BackToList.propTypes = {
  children: PropTypes.node,
}

export default BackToList

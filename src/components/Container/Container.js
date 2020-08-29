import React from "react"
import PropTypes from "prop-types"

const Container = ({ children, ...restOfProps }) => (
  <div
    style={{
      paddingLeft: 20,
      paddingRight: 20,
      maxWidth: 600,
      width: "100%",
      margin: "0 auto",
    }}
    {...restOfProps}
  >
    {children}
  </div>
)

Container.propTypes = {
  children: PropTypes.node.isRequired,
}
export default Container

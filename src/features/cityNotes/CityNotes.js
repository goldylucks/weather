import React from "react"
import { useSelector } from "react-redux"
import PropTypes from "prop-types"
import CityNote from "./CityNote"

const CityNotes = ({ listId }) => {
  const notes = useSelector((state) => state.cityNotes[listId])

  if (!notes) {
    return null
  }

  return (
    <ul>
      {Object.values(notes).map((note) => (
        <CityNote listId={listId} key={note.id} {...note} />
      ))}
    </ul>
  )
}

CityNotes.propTypes = {
  listId: PropTypes.string.isRequired,
}

export default CityNotes

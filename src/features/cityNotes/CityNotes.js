import React from "react"
import { useSelector } from "react-redux"
import PropTypes from "prop-types"
import { TransitionGroup, CSSTransition } from "react-transition-group"

import CityNote from "./CityNote"

const CityNotes = ({ listId }) => {
  const notes = useSelector((state) => state.cityNotes[listId])

  if (!notes) {
    return null
  }

  return (
    <TransitionGroup>
      {Object.values(notes).map((note) => (
        <CSSTransition
          timeout={250}
          classNames="city-notes-transitions"
          key={note.id}
        >
          <CityNote listId={listId} {...note} />
        </CSSTransition>
      ))}
    </TransitionGroup>
  )
}

CityNotes.propTypes = {
  listId: PropTypes.string.isRequired,
}

export default CityNotes

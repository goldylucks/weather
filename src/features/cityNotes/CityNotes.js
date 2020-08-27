import React from "react"
import { useSelector } from "react-redux"
import CityNote from "./CityNote"

const CityNotes = ({ listId }) => {
  const notes = useSelector((state) => state.cityNotes[listId])

  if (!notes) {
    return null
  }

  return (
    <div>
      {Object.values(notes).map((note) => (
        <CityNote listId={listId} key={note.id} {...note} />
      ))}
    </div>
  )
}

export default CityNotes

import React from "react"
import { faEdit } from "@fortawesome/free-regular-svg-icons"
import { faTimes, faTrash } from "@fortawesome/free-solid-svg-icons"
import { faCheck } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styles from "./CityNotes.module.css"
import { useDispatch } from "react-redux"
import {
  setEditingText,
  confirmEdit,
  startEditing,
  cancelEdit,
  remove,
} from "./cityNotesSlice"

const CityNote = ({ listId, id, text, isEditing, editingText }) => {
  const dispatch = useDispatch()

  const handleChange = (evt) => {
    dispatch(setEditingText({ listId, id, editingText: evt.target.value }))
  }

  const handleConfirmEdit = () => {
    dispatch(confirmEdit({ listId, id, editingText }))
  }

  const handleStartEditing = () => {
    dispatch(startEditing({ listId, id }))
  }

  const handleCancelEdit = () => {
    dispatch(cancelEdit({ listId, id }))
  }

  const handleRemoveNote = () => {
    dispatch(remove({ listId, id }))
  }

  if (isEditing) {
    return (
      <div>
        <textarea
          onChange={handleChange}
          placeholder="Write note here"
          value={editingText}
        />
        <FontAwesomeIcon
          onClick={handleConfirmEdit}
          icon={faCheck}
          className={styles.cityNoteCheck}
        />
        <FontAwesomeIcon
          onClick={handleCancelEdit}
          icon={faTimes}
          className={styles.cityNoteCheck}
        />
      </div>
    )
  }

  return (
    <div>
      <p>{text}</p>
      <FontAwesomeIcon
        onClick={handleStartEditing}
        icon={faEdit}
        className={styles.startEditing}
      />
      <FontAwesomeIcon
        onClick={handleRemoveNote}
        icon={faTrash}
        className={styles.removeNote}
      />
    </div>
  )
}

export default CityNote

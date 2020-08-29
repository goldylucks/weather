import React from "react"
import { faEdit } from "@fortawesome/free-regular-svg-icons"
import PropTypes from "prop-types"
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons"
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
          className="textarea"
        />
        <button
          style={{ marginRight: 10 }}
          onClick={handleConfirmEdit}
          className="button"
        >
          Confirm
        </button>
        <button onClick={handleCancelEdit} className="button">
          Cancel
        </button>
      </div>
    )
  }

  return (
    <li className={styles.cityNote}>
      <p>{text}</p>
      <div className={styles.noteActions}>
        <FontAwesomeIcon
          onClick={handleStartEditing}
          icon={faEdit}
          className={styles.noteAction}
        />
        <FontAwesomeIcon
          onClick={handleRemoveNote}
          icon={faTrashAlt}
          className={styles.noteAction}
        />
      </div>
    </li>
  )
}

CityNote.propTypes = {
  listId: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  isEditing: PropTypes.bool.isRequired,
  editingText: PropTypes.string.isRequired,
}

export default CityNote

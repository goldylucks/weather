import React, { useRef, useEffect, useState } from "react"
import { faEdit } from "@fortawesome/free-regular-svg-icons"
import PropTypes from "prop-types"
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import cx from "classnames"
import { IS_MOBILE } from "../../constants/mobile"
import styles from "./CityNotes.module.css"
import { useDispatch } from "react-redux"
import {
  setEditingText,
  confirmEdit,
  startEditing,
  cancelEdit,
  remove,
} from "./cityNotesSlice"
import EditCityNote from "./EditCityNote"
import useSetHeight from "../../hooks/useSetHeight"

const CityNote = ({ listId, id, text, isEditing, editingText }) => {
  const containerEl = useRef(null)
  const containerHeight = useSetHeight({
    dependencies: [isEditing],
    ref: containerEl,
  })

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

  const note = (
    <li className={styles.cityNote}>
      <p>{text}</p>
      <div
        className={cx(styles.noteActions, { [styles["is-mobile"]]: IS_MOBILE })}
      >
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

  return (
    <div
      className={styles.cityNoteContainer}
      ref={containerEl}
      style={{ height: containerHeight }}
    >
      {isEditing ? (
        <EditCityNote
          editingText={editingText}
          onChange={handleChange}
          onConfirm={handleConfirmEdit}
          onCancel={handleCancelEdit}
        />
      ) : (
        note
      )}
    </div>
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

import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { faCheck } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import styles from "./CityNotes.module.css"
import { add } from "./cityNotesSlice"

const AddCityNote = ({ listId }) => {
  const dispatch = useDispatch()
  const [text, setText] = useState("")

  const handleChange = (evt) => setText(evt.target.value)

  const handleAddNote = () => {
    if (!text) {
      return
    }
    setText("")
    dispatch(add({ listId, text }))
  }

  return (
    <div>
      <textarea
        onChange={handleChange}
        value={text}
        placeholder="Add note here"
        className="textarea"
      />
      <button onClick={handleAddNote} icon={faCheck} className="button">
        Add note
      </button>
    </div>
  )
}

export default AddCityNote

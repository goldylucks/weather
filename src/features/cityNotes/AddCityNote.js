import React, { useState } from "react"
import { useDispatch } from "react-redux"
import PropTypes from "prop-types"
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
    <div style={{ paddingBottom: 20 }}>
      <textarea
        onChange={handleChange}
        value={text}
        placeholder="Add note here"
        className="textarea"
      />
      <button onClick={handleAddNote} className="button">
        Add note
      </button>
    </div>
  )
}

AddCityNote.propTypes = {
  listId: PropTypes.string.isRequired,
}

export default AddCityNote

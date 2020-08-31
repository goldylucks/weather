import React from "react"
import PropTypes from "prop-types"

const EditCityNote = ({ editingText, onChange, onConfirm, onCancel }) => (
  <div>
    <textarea
      onChange={onChange}
      placeholder="Write note here"
      value={editingText}
      className="textarea"
    />
    <button style={{ marginRight: 10 }} onClick={onConfirm} className="button">
      Confirm
    </button>
    <button onClick={onCancel} className="button">
      Cancel
    </button>
  </div>
)

EditCityNote.propTypes = {
  editingText: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
}
export default EditCityNote

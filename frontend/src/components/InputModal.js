import React, { useState, useEffect, useContext } from "react";
import noteContext from "../context/notes/noteContext";

export default function InputModal({
  modalStatus,
  setModalStatus,
  fieldContent,
}) {
  const [notes, setNotes] = useState({
    title: "",
    description: "",
    tag: "",
  });
  const [alert, setAlert] = useState("is-hidden");

  useEffect(() => {
    setNotes({
      title: fieldContent.title,
      description: fieldContent.description,
      tag: fieldContent.tag,
    });
    // eslint-disable-next-line
  }, [fieldContent.title]);

  const context = useContext(noteContext);
  const { editNote, addNote } = context;
  const onChange = (e) => {
    setNotes({ ...notes, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    setAlert("is-hidden");
    if (notes.title.length < 3 || notes.description.length < 5) {
      setAlert("");
      return;
    }
    editNote(fieldContent.id, notes.title, notes.description, notes.tag);
    setModalStatus("");
  };

  const handleAdd = (e) => {
    e.preventDefault();
    setAlert("is-hidden");
    if (notes.title.length < 3 || notes.description.length < 5) {
      setAlert("");
      return;
    }
    addNote(notes.title, notes.description, notes.tag);
    setModalStatus("");
  };

  const handleClose = () => {
    setModalStatus("");
  };
  return (
    <div className={`modal ${modalStatus}`}>
      <div className="modal-background"></div>
      <div className="modal-content">
        <div className="box">
          <button
            className="delete is-large"
            style={{
              position: "absolute",
              zIndex: "10",
              right: "7px",
              top: "7px",
            }}
            onClick={handleClose}
          ></button>

          <div className="field mt-3">
            <label className="label">Title*</label>
            <div className="control">
              <input
                className="input"
                required
                defaultValue={fieldContent.title}
                type="text"
                placeholder="Title"
                name="title"
                onChange={onChange}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Description*</label>
            <div className="control">
              <textarea
                className="textarea"
                rows="2"
                required
                defaultValue={fieldContent.description}
                placeholder="Description"
                name="description"
                onChange={onChange}
              ></textarea>
            </div>
          </div>
          <div className="field">
            <label className="label">Tag</label>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Tag"
                defaultValue={fieldContent.tag}
                name="tag"
                onChange={onChange}
              />
            </div>
          </div>
          <div className="field is-grouped">
            <div className={`control ${fieldContent.addBtnVisible}`}>
              <button className="button is-primary" onClick={handleAdd}>
                Add
              </button>
            </div>
            <div className={`control ${fieldContent.saveBtnVisible}`}>
              <button className="button is-primary" onClick={handleSave}>
                Save
              </button>
            </div>
            <div className="control">
              <button className="button" onClick={handleClose}>
                Close
              </button>
            </div>
          </div>
          <div className={`notification is-danger is-light p-2 ${alert}`}>
            <button
              className="delete is-medium"
              onClick={() => {
                setAlert("is-hidden");
              }}
            ></button>
            Title should be of 3 length and description should be of 5 length
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useContext } from "react";
import noteContext from "../context/notes/noteContext";

export default function AddNotes() {
  const [notes, setNotes] = useState({
    title: "",
    description: "",
    tag: "default",
  });

  const context = useContext(noteContext);
  const { addNote } = context;
  const onChange = (e) => {
    setNotes({ ...notes, [e.target.name]: e.target.value });
  };

  const handleAddNote = (e) => {
    e.preventDefault();
    addNote(notes.title, notes.description, notes.tag);
  };

  return (
    <>
      <form action="" onSubmit={handleAddNote}>
        <div className="field">
          <label className="label">Titlel*</label>
          <div className="control">
            <input
              className="input"
              required
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
              required
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
              name="tag"
              onChange={onChange}
            />
          </div>
        </div>
        <div className="field is-grouped">
          <div className="control">
            <input
              className="button is-primary"
              type="submit"
              value="Add note"
            ></input>
          </div>
          <div className="control">
            <button className="button ">Cancel</button>
          </div>
        </div>
      </form>
    </>
  );
}

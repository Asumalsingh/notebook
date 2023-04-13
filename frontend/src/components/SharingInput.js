import React, { useState, useContext } from "react";
import noteContext from "../context/notes/noteContext";

export default function SharingInput({
  id,
  shareModalStatus,
  setShareModalStatus,
  title,
}) {
  const [sharingInfo, setSharingInfo] = useState({
    email: "",
    access: "viewer",
  });

  const onChange = (e) => {
    setSharingInfo({
      ...sharingInfo,
      [e.target.name]: e.target.value,
    });
  };

  const nContext = useContext(noteContext);
  const { shareNote } = nContext;

  const handleClose = () => {
    setShareModalStatus("");
  };
  const handleShare = (e) => {
    e.preventDefault();
    shareNote(id, sharingInfo.email, sharingInfo.access);
    setShareModalStatus("is-hidden");
  };
  return (
    <>
      <div className={`modal ${shareModalStatus}`}>
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

            <h1 className="title is-5">Share "{title}"</h1>
            <form action="" onSubmit={handleShare}>
              <label className="label">Email*</label>
              <div className="field has-addons">
                <div className="control is-expanded">
                  <input
                    className="input is-fullwidth"
                    required
                    type="email"
                    placeholder="add email"
                    name="email"
                    onChange={onChange}
                  />
                </div>
                <div className="control">
                  <div className="select">
                    <select name="access" onChange={onChange}>
                      <option>viewer</option>
                      <option>editor</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <input
                    type="submit"
                    className="button is-primary"
                    value="Share"
                  ></input>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

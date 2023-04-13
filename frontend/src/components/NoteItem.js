import React, { useContext, useEffect, useState } from "react";
import noteContext from "../context/notes/noteContext";
import InputModal from "./InputModal";
import { FaShareAlt, FaUsers } from "react-icons/fa";
import SharingInput from "./SharingInput";
import userContext from "../context/user/userContext";

export default function NoteItem({ noteData }) {
  const [modalStatus, setModalStatus] = useState("");
  const [shareModalStatus, setShareModalStatus] = useState("");
  const [sharedType, setSharedType] = useState("");

  const nContext = useContext(noteContext);
  const { deletNote } = nContext;
  const uContext = useContext(userContext);
  const { user } = uContext;

  const { title, description, tag, _id, date, userId, sharedWith } = noteData;

  const [fieldContent, setFieldContent] = useState({
    id: "",
    title: "",
    description: "",
    tag: "",
    saveBtnVisible: "",
    addBtnVisible: "is-hidden",
  });

  useEffect(() => {
    for (let i = 0; i < sharedWith.length; i++) {
      if (sharedWith[i].email === user.email) {
        setSharedType(sharedWith[i].access);
        break;
      }
    }
    // eslint-disable-next-line
  }, []);

  const handleEdit = (id) => {
    setFieldContent({
      ...fieldContent,
      id: id,
      title: title,
      description: description,
      tag: tag,
    });
    setModalStatus("is-active");
  };

  const handleDelete = (id) => {
    deletNote(id);
  };

  const handleShareIcon = (id) => {
    setShareModalStatus("is-active");
  };

  return (
    <>
      <InputModal
        modalStatus={modalStatus}
        setModalStatus={setModalStatus}
        fieldContent={fieldContent}
      />
      <div className="box">
        <p className="title is-5 mb-2"> {title}</p>
        <p className="mb-3">{description}</p>
        <span style={{ fontSize: "0.7rem", color: "hsl(0, 0%, 71%)" }}>
          Last Updated: {date}
        </span>
        {userId !== user._id ? (
          sharedType === "viewer" ? (
            <div className="mt-3 is-flex">
              <FaUsers size={"20px"} />
              <span
                className="ml-2"
                style={{ fontSize: "0.8rem", color: "hsl(0, 0%, 51%)" }}
              >
                Shared as viewer
              </span>
            </div>
          ) : (
            <div className="mt-3 is-flex is-align-items-end">
              <button
                className="button is-small mr-4"
                onClick={() => {
                  handleEdit(_id);
                }}
              >
                Edit
              </button>
              <FaUsers size={"20px"} />
              <span
                className="ml-2"
                style={{ fontSize: "0.8rem", color: "hsl(0, 0%, 51%)" }}
              >
                Shared as Editor
              </span>
            </div>
          )
        ) : (
          <div className={`mt-3 is-flex is-justify-content-space-between`}>
            <div className="is-flex is-align-items-end">
              <button
                className="button is-small mr-4"
                onClick={() => {
                  handleEdit(_id);
                }}
              >
                Edit
              </button>
              <button
                className="button is-small is-danger"
                onClick={() => handleDelete(_id)}
              >
                Delete
              </button>

              {sharedWith.length > 0 ? (
                <div className="dropdown  ml-4 is-hoverable">
                  <div className="dropdown-trigger">
                    <FaUsers style={{ cursor: "pointer" }} size={"20px"} />
                  </div>
                  <div
                    className="dropdown-menu"
                    id="dropdown-menu4"
                    role="menu"
                  >
                    <div className="dropdown-content">
                      {sharedWith.map((e, index) => {
                        return (
                          <div key={index}>
                            <div className="dropdown-item is-flex is-justify-content-space-between">
                              <span>{e.email}</span>
                              <span className="ml-5">{e.access}</span>
                            </div>
                            <hr className="dropdown-divider" />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="is-flex is-align-items-end">
              <FaShareAlt
                onClick={() => handleShareIcon(_id)}
                style={{ cursor: "pointer" }}
                size={"20px"}
              />
            </div>
          </div>
        )}
      </div>
      <SharingInput
        id={_id}
        title={title}
        shareModalStatus={shareModalStatus}
        setShareModalStatus={setShareModalStatus}
      />
    </>
  );
}

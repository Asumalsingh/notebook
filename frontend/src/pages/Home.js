import React, { useContext, useEffect, useState } from "react";
import InputModal from "../components/InputModal";
import NoteItem from "../components/NoteItem";
import noteContext from "../context/notes/noteContext";
import { FaPlus, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Pagination } from "@mantine/core";
export default function Home() {
  const [modalStatus, setModalStatus] = useState("");
  const fieldContent = {
    title: "",
    description: "",
    tag: "",
    saveBtnVisible: "is-hidden",
    addBtnVisible: "",
  };
  const [activePage, setActivePage] = useState(1);

  const nContext = useContext(noteContext);
  const { notes, setQuery, setPage, totalPage } = nContext;
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("auth-token")) {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setPage(activePage);
    // eslint-disable-next-line
  }, [activePage]);

  const hendleAddNote = () => {
    setModalStatus("is-active");
  };

  const onChangeQuery = (e) => {
    if (e.target.value.length > 1) {
      setQuery(e.target.value);
    } else {
      setQuery("");
    }
  };

  return (
    <>
      <div className="py-3">
        <div className="field has-addons" style={{ maxWidth: "500px" }}>
          <div className="control is-expanded  has-icons-right">
            <input
              className="input"
              type="text"
              placeholder="Search here . . ."
              onChange={onChangeQuery}
            />
            <span className="icon is-right">
              <FaSearch />
            </span>
            
          </div>
        </div>
        <div className=" mb-4 ">
          <button className="button is-primary " onClick={hendleAddNote}>
            <FaPlus /> &nbsp;Add note
          </button>
          <p className="">Access your note at anytime and anywhere</p>
        </div>
        <InputModal
          modalStatus={modalStatus}
          setModalStatus={setModalStatus}
          fieldContent={fieldContent}
        />
        <div className="columns is-flex-wrap-wrap">
          {notes.map((note) => {
            return (
              <div className="column is-6" key={note._id}>
                <NoteItem noteData={note} />
              </div>
            );
          })}
        </div>

        <Pagination
          page={activePage}
          onChange={setActivePage}
          total={totalPage}
        />
      </div>
    </>
  );
}

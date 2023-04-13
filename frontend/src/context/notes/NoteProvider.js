import React, { useState, useEffect } from "react";
import noteContext from "./noteContext";
import host from "../../dbConfig";

const NoteProvider = (props) => {
  const authToken = localStorage.getItem("auth-token");
  const [notes, setNotes] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [totalPage, setTotalPage] = useState();

  // 1. to get all notes
  const getNotes = () => {
    // api call
    if (authToken) {
      fetch(`${host}/api/notes/getnote?page=${page}&q=${query}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken,
        },
      }).then(async (res) => {
        const json = await res.json();
        setNotes(json.notes);
        setTotalPage(json.totalPage);
      });
    }
  };

  useEffect(() => {
    getNotes();
    // eslint-disable-next-line
  }, [query, page]);

  // 2. to add note
  const addNote = (title, description, tag) => {
    // api call
    if (authToken) {
      fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken,
        },
        body: JSON.stringify({ title, description, tag }),
      }).then(async (res) => {
        const savedNote = await res.json();
        setNotes(notes.concat(savedNote));
      });
    }
  };

  // 3. to edit note
  const editNote = (id, title, description, tag) => {
    // update in client
    for (let i = 0; i < notes.length; i++) {
      if (notes[i]._id === id) {
        notes[i].title = title;
        notes[i].description = description;
        notes[i].tag = tag;
      }
    }
    setNotes(notes);
    // api call
    if (authToken) {
      fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken,
        },
        body: JSON.stringify({ id, title, description, tag }),
      });
    }
  };

  // 4. to delete note
  const deletNote = (id) => {
    // delete from client
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
    // api call to delete form database
    if (authToken) {
      fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken,
        },
      });
    }
  };

  // 5. share note
  const shareNote = (id, email, access) => {
    // update in client
    for (let i = 0; i < notes.length; i++) {
      if (notes[i]._id === id) {
        let exist = false;
        for (let j = 0; j < notes[i].sharedWith.length; j++) {
          if (notes[i].sharedWith[j].email === email) {
            notes[i].sharedWith[j].access = access;
            exist = true;
            break;
          }
        }
        if (!exist) notes[i].sharedWith.push({ email, access });
      }
    }
    setNotes(notes);
    // api call
    if (authToken) {
      fetch(`${host}/api/notes/sharenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken,
        },
        body: JSON.stringify({ id, email, access }),
      });
    }
  };

  return (
    <noteContext.Provider
      value={{
        notes,
        addNote,
        editNote,
        deletNote,
        setQuery,
        setPage,
        totalPage,
        shareNote,
      }}
    >
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteProvider;

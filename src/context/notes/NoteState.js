import Notecontext from "./NoteContext";
import React from "react";
import { useState } from "react";
const Notestate = (props) => {
  const host = "http://localhost:5000";
  const initial = [];

  const [notes, setnotes] = useState(initial);



  //Fetch all the notes.
  const getNotes = async () => {
    // API call
    // Example POST method implementation:
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token')
      },
    });
    const json = await response.json();
    setnotes(json);
  };





  //Add a note
  const addNote = async (title, description, tag) => {
    // todo API calls
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token')
      },

      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json();
    setnotes(notes.concat(note));
  };




  //Delete a Note
  const deleteNote = async (id) => {
    // todo API calls
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
        localStorage.getItem('token')
      },
    });
    const json = await response.json();
    console.log(json);
    console.log("deleting the user with id" + id);
    const newnotes = notes.filter((note) => {
      return note._id !== id;
    });
    setnotes(newnotes);
  };




  //Edit a Note
  const editNote = async (
    id = "6165210f5c5f1939bcdbd3a7",
    title,
    description,
    tag
  ) => {
    // API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json);
    const newnotes = JSON.parse(JSON.stringify(notes));

    // Logic to edit in client side.
    for (let index = 0; index < newnotes.length; index++) {
      const elements = newnotes[index];
      if (elements._id === id) {
        newnotes[index].title = title;
        newnotes[index].description = description;
        newnotes[index].tag = tag;
        break;
      }
    }
    setnotes(newnotes);
  };


  
  // Note Context Part
  return (
    // provides states to notecontext
    <Notecontext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </Notecontext.Provider>
  );
};
export default Notestate;

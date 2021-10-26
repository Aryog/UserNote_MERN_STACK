import React, { useContext, useState } from "react";
import NoteContext from "../context/notes/NoteContext";
const Addnote = (props) => {
  const context = useContext(NoteContext);

  //addnote from the notestate to notecontext
  const { addNote } = context;
  const [note, setnote] = useState({ title: "", description: "", tag: "" });

  const onChange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value });
  };

  const handleClick = (e) => {
    // to prevent loading of page while submit
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setnote({ title: "", description: "", tag: "" })
    props.showAlert("Note Added Successfully!","success")
  };

  return (
    <div>
      <h1>| Add a Note</h1>
      <div className="container my-3">
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={note.title}
              aria-describedby="emailHelp"
              onChange={onChange}
            />
            <div id="emailHelp" className="form-text"></div>
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              value={note.description}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
            value={note.tag}              
              onChange={onChange}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleClick}
            disabled={note.title<5 || note.description<5}
          >
            Add Note
          </button>
        </form>
      </div>
      <h1>| User Notes</h1>
    </div>
  )
}
export default Addnote;
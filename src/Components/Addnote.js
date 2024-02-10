import React, { useContext, useState, useRef } from "react";
import NoteContext from "../Context/notes/NoteContext";

function Addnote() {
  const { Mode,addnotes ,showalert} = useContext(NoteContext);
  const ref = useRef();
  const [note, Setnote] = useState({ title: "", discription: "", tag: "" });
  const handleonSubmit = (e) => {
    e.preventDefault();
    addnotes(note.title, note.discription, note.tag);
    showalert("! New note added.","success")
    ref.current.reset();
  };
  const onchange = (e) => {
    Setnote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <form ref={ref} onSubmit={handleonSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className={`form-control bg-${
              Mode === "light" ? "light" : "body-secondary"
            }`}
            id="title"
            name="title"
            aria-describedby="emailHelp"
            onChange={onchange}
            minLength={4}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="discription" className="form-label">
            Discription
          </label>
          <input
            type="text"
            className={`form-control bg-${
              Mode === "light" ? "light" : "body-secondary"
            }`}
            id="discription"
            name="discription"
            onChange={onchange}
            minLength={4}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className={`form-control bg-${
              Mode === "light" ? "light" : "body-secondary"
            }`}
            id="tag"
            name="tag"
            onChange={onchange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Note
        </button>
      </form>
    </div>
  );
}

export default Addnote;

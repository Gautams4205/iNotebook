import React, { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../Context/notes/NoteContext";
import Noteitems from "./Noteitems";
import { useNavigate } from "react-router-dom";

function Notes() {
  const { Notes, getallnotes, editnote, showalert } = useContext(NoteContext);
  const navigate = useNavigate();
  const ref = useRef();
  const Closeref = useRef();
  const [note, Setnote] = useState({
    _id: "",
    title: "",
    discription: "",
    tag: "",
  });
  const handleonClick = (e) => {
    e.preventDefault();
    editnote(note._id, note.title, note.discription, note.tag);
    showalert("Note added.", "success");
    Closeref.current.click();
  };
  const onchange = (e) => {
    Setnote({ ...note, [e.target.name]: e.target.value });
  };
  const updatenote = (currentnote) => {
    ref.current.click();
    Setnote(currentnote);
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getallnotes();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);
  return (
    <>
      {/* Button trigger modal */}
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>
      {/* Modal */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Update Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
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
                    onChange={onchange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="discription" className="form-label">
                    Discription
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={note.discription}
                    id="discription"
                    name="discription"
                    onChange={onchange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    value={note.tag}
                    className="form-control"
                    id="tag"
                    name="tag"
                    onChange={onchange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={Closeref}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleonClick}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="container mx-5">
          {Notes.length === 0 && "No notes are available to show."}
        </div>
        {Notes.map((note) => (
          <Noteitems
            key={note._id}
            note={note}
            updatenote={updatenote}
          ></Noteitems>
        ))}
      </div>
    </>
  );
}

export default Notes;

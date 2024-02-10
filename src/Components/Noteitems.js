import React, { useContext } from "react";
import NoteContext from "../Context/notes/NoteContext";

function Noteitems({note,updatenote}) {
  const { deletenote,showalert } = useContext(NoteContext);
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h5 className="card-title">{note.title}</h5>
            <i className="fa-regular fa-trash-can mx-2" onClick={()=>{deletenote(note._id);showalert("! Deleted","success")}}></i>
            <i className="fa-regular fa-pen-to-square mx-2" onClick={()=>updatenote(note)}></i>
          </div>
          <p className="card-text">{note.discription}</p>
        </div>
      </div>
    </div>
  );
}

export default Noteitems;

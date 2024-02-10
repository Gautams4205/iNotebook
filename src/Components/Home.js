import React, { useContext } from "react";
import Notes from "./Notes";
import Addnote from "./Addnote";
import NoteContext from "../Context/notes/NoteContext";

export default function Home() {
  const {Mode}=useContext(NoteContext)
  return (
    <>
      <div className={`container my-3 text-${
                Mode === "light" ? "dark" : "info"}`}>
        <h2>Add a note.</h2>
        <Addnote></Addnote>
        <h2>Your's notes.</h2>
        <Notes></Notes>
      </div>
    </>
  );
}

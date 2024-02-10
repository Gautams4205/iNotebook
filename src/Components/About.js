import React, { useContext } from 'react'
import NoteContext from '../Context/notes/NoteContext';

export default function About() {
  const {Mode}=useContext(NoteContext)
  return (
    <>
      <div
        className={`container my-3 text-${Mode === "light" ? "dark" : "secondary"}`}
      >
        <h1 className="display-4">iNotebook Overview</h1>
        <p className="lead">
          iNotebook is an online web platform that allows you to privately and
          securely create, edit, upload, and delete your notes and information.
          Whether you're jotting down ideas, organizing your thoughts, iNotebook
          has got you covered.
        </p>
        <h2>Purpose</h2>
        <p>
          iNotebook serves as your personal digital notebook on the cloud. It's
          designed to be convenient, accessible, and hassle-free.
        </p>
        <h2>Features</h2>
        <ul>
          <li>
            <strong>Add Notes:</strong> Easily create new notes or entries.
          </li>
          <li>
            <strong>Edit Content:</strong> Modify your existing notes as needed.
          </li>
          <li>
            <strong>Delete Entries:</strong> Remove any outdated or unnecessary
            content.
          </li>
          <li>
            <strong>Privacy:</strong> Your notes remain private and are
            accessible only to you.
          </li>
          <li>
            <strong>Security:</strong> iNotebook ensures the security of your
            data.
          </li>
        </ul>
        <p>
          For more details, visit the{" "}
          <a href="https://inotebook.in/">iNotebook website</a>.
        </p>
      </div>
    </>
  );
}

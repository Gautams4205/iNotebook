import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import About from "./Components/About";
import Home from "./Components/Home";
import NoteContext from "./Context/notes/NoteContext";
import { useState } from "react";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Alert from "./Components/Alert";

function App() {
  const [Mode, SetMode] = useState("light");
  const [alert, Setalert] = useState(null);
  const showalert = (message, type) => {
    Setalert({ message: message, type: type });
    setTimeout(() => {
      Setalert(null);
    }, 2000);
  };

  const togglemode = () => {
    if (Mode === "light") {
      SetMode("dark");
      document.body.style.backgroundColor = "#042743";
      showalert("! Dark mode Enable", "success");
    } else {
      SetMode("light");
      document.body.style.backgroundColor = "white";
      showalert("!  Light mode Enable", "success");
    }
  };

  const host = "http://localhost:5000";
  const Initialnotes = [];
  const [Notes, SetNotes] = useState(Initialnotes);
  const getallnotes = async () => {
    const url = `${host}/api/note/fetchallnotes`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authtoken: localStorage.getItem("token"),
      },
    });
    const notes = await response.json();
    SetNotes(notes);
  };
  const addnotes = async (title, discription, tag) => {
    const url = `${host}/api/note/addnote`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authtoken: localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, discription, tag }),
    });
    const note = await response.json();
    SetNotes(Notes.concat(note));
  };
  const editnote = async (id, title, discription, tag) => {
    const url = `${host}/api/note/update/${id}`;
    // eslint-disable-next-line
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authtoken: localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, discription, tag }),
    });

    const newNotes = [...Notes];

    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].discription = discription;
        newNotes[index].tag = tag;
        break;
      }
      SetNotes(newNotes);
    }
  };
  const deletenote = async (id) => {
    const url = `${host}/api/note/delete/${id}`;
    // eslint-disable-next-line
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authtoken: localStorage.getItem("token"),
      },
    });
    const newNotes = Notes.filter((note) => note._id !== id);
    SetNotes(newNotes);
  };

  return (
    <>
      <NoteContext.Provider
        value={{
          Mode,
          Notes,
          addnotes,
          editnote,
          deletenote,
          getallnotes,
          showalert,
        }}
      >
        <Router>
          <Navbar togglemode={togglemode}></Navbar>
          <Alert alert={alert} />
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home />}></Route>
              <Route exact path="/about" element={<About />}></Route>
              <Route exact path="/login" element={<Login />}></Route>
              <Route exact path="/signup" element={<Signup />}></Route>
            </Routes>
          </div>
        </Router>
      </NoteContext.Provider>
    </>
  );
}

export default App;

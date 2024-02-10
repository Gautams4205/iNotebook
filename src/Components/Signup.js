import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import NoteContext from "../Context/notes/NoteContext";

export default function Signup() {
  const { showalert } = useContext(NoteContext);
  const [credentials, Setcredentials] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleonSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      showalert("! New user created.", "success");
      navigate("/");
    } else {
      showalert(`! ${json.error}`, "danger");
      navigate("/signup");
    }
  };

  const onChange = (e) => {
    Setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mt-3">
      <h2>Signup to iNotebook</h2>
      <form className="container" onSubmit={handleonSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            onChange={onChange}
            minLength={4}
            required
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            required
            onChange={onChange}
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            required
            minLength={5}
            name="password"
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Signin
        </button>
      </form>
    </div>
  );
}

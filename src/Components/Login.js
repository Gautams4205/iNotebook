import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import NoteContext from "../Context/notes/NoteContext";

function Login() {
  const [credentials, Setcredentials] = useState({ email: "", password: "" });
  const { showalert,Mode } = useContext(NoteContext);
  const navigate = useNavigate();
  const handleonSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      showalert("! Login to iNotebook.", "success");
      navigate("/");
    } else {
      showalert(`! ${json.error}`, "danger");
      navigate("/login");
    }
  };
  const onChange = (e) => {
    Setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className={`container mt-2 text-${
                Mode === "light" ? "dark" : "info"}`}>
      <h2>Login to iNotebook.</h2>
      <form className="container" onSubmit={handleonSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            onChange={onChange}
            required
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
            name="password"
            required
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;

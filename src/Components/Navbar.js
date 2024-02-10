import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NoteContext from "../Context/notes/NoteContext";

export default function Navbar(props) {
  const {Mode} = useContext(NoteContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  const location = useLocation();
  return (
    <div>
      <nav
        className={`navbar navbar-expand-lg navbar-${Mode} bg-${Mode}`}
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            iNotebook
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/about" ? "active" : ""
                  }`}
                  to="/about"
                >
                  About
                </Link>
              </li>
            </ul>
            <div
              className={`d-flex form-check form-switch text-${
                Mode === "light" ? "dark" : "info"
              } `}
            >
              <input
                className="form-check-input mx-1"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
                onClick={props.togglemode}
              />
              <label
                className="form-check-label "
                htmlFor="flexSwitchCheckDefault"
              >
                Enable Darkmode
              </label>
              {!localStorage.getItem("token") ? (
                <form>
                  <Link
                    className="btn btn-primary btn-sm mx-1 "
                    role="button"
                    to="/login"
                  >
                    Login
                  </Link>
                  <Link
                    className="btn btn-secondary btn-sm mx-1 "
                    role="button"
                    to="/signup"
                  >
                    Signup
                  </Link>
                </form>
              ) : (
                <button
                  className="btn btn-primary mx-1 btn-sm"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

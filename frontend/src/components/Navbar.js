import React, { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import userContext from "../context/user/userContext";
import { FaUserCircle } from "react-icons/fa";

export default function Navbar() {
  const [navMobile, setNavMovile] = useState("");
  let location = useLocation();
  const uContext = useContext(userContext);
  const { user } = uContext;
  let content;

  const handleMobileNav = () => {
    navMobile === "" ? setNavMovile("is-active") : setNavMovile("");
  };
  if (user) {
    content = (
      <div className="is-flex">
        <b className="mr-3"> {user.name},</b>
        <Link to="/profile">
          <FaUserCircle size={"30px"} />
        </Link>
      </div>
    );
  } else {
    content = (
      <div className="buttons">
        <Link to="/login" className="button is-small is-info">
          Login
        </Link>
        {/* <Link to="/signup" className="button is-small is-info">
          Signup
        </Link> */}
      </div>
    );
  }

  return (
    <>
      <nav
        className="navbar is-transparent is-fixed-top "
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <Link to="/" className={`navbar-item`}>
            <b> I-notebook</b>
          </Link>
          <div
            role="button"
            className={`navbar-burger  ${navMobile}`}
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
            onClick={handleMobileNav}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </div>
        </div>

        <div id="navbarBasicExample" className={`navbar-menu  ${navMobile}`}>
          <div className="navbar-start">
            <Link
              to="/about"
              className={`navbar-item ${
                location.pathname === "/about" ? "is-tab is-active" : ""
              }`}
            >
              About
            </Link>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">{content}</div>
          </div>
        </div>
      </nav>
    </>
  );
}

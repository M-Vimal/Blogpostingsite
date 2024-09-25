import React from "react";
import { useContext } from "react";
import { Authcontext } from "../App";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import "../css/navbar.css";
const Navbar = () => {
  const { auth, setauth } = useContext(Authcontext);
  const [isOpen, setIsOpen] = useState(false);
  const toggleham = () => {
    setIsOpen((prevState) => !prevState);
    console.log("on");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Navbar
          </a>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/myposts">
                  MyPosts
                </a>
              </li>
              {auth ? (
                <a className="btn btn-outline-danger ms-auto" href="/logout">
                  Logout
                </a>
              ) : (
                <a className="btn btn-outline-success ms-auto" href="/login">
                  Login
                </a>
              )}
            </ul>
          </div>
          
        </div>
      </nav>
      <div className="hamburger">
            <GiHamburgerMenu onClick={toggleham} />
          </div>
          {isOpen && (
            <div
              className="dropdown-menu show"
              aria-labelledby="navbarDropdown"
            >
              <a className="dropdown-item" href="/">
                Home
              </a>
              <a className="dropdown-item" href="/myposts">
                MyPosts
              </a>
              {auth ? (
                <a className="dropdown-item" href="/logout">
                  Logout
                </a>
              ) : (
                <a className="dropdown-item" href="/login">
                  Login
                </a>
              )}
            </div>
          )}
    </div>
  );
};

export default Navbar;

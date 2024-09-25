import React, { useState } from "react";
import "../css/login.css";
import { useRef, useContext } from "react";
import axios from "axios";
import { Authcontext } from "../App";
import { useNavigate } from "react-router-dom";
import { FaUserTie } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
const Login = () => {
  const usernameref = useRef();
  const passwordref = useRef();
  const [errors, seterrors] = useState({});
  const { auth, setauth } = useContext(Authcontext);
  const navigate = useNavigate();
  const login = async (e) => {
    e.preventDefault();
    const username = usernameref.current.value;
    const password = passwordref.current.value;
    const data = { username, password };
    try {
      const res = await axios.post(
        "https://vimalganesh.pythonanywhere.com/login/",
        data
      );
      if (res) {
        console.log(res.data);
        localStorage.setItem("accesstoken", res.data.access);
        localStorage.setItem("refreshtoken", res.data.refresh);
        localStorage.setItem("id", res.data.user.id);
        setauth(true);
        navigate("/");
      } else
        (err) => {
          console.error("error", err);
        };
    } catch (err) {
      if (err.response) {
        console.log("error", err.response.data);
        seterrors(err.response.data);
      }
    }
  };
  return (
    <div className="logindiv">
      <h1>welcome to login page</h1>
      <div className="inside-logindiv">
        <form onSubmit={login}>
          <div className="form-elements">
            <input
              type="text"
              name="username"
              required
              ref={usernameref}
              placeholder="username"
            />
            <FaUserTie className="icon" />
          </div>
          <div className="form-elements">
            <input
              type="password"
              name="password"
              required
              ref={passwordref}
              placeholder="password"
            />
            <RiLockPasswordFill className="icon" />
          </div>
          <div className="form-elements">
            {errors.message && (
              <p className="error-message">{errors.message}</p>
            )}
          </div>
          <div className="form-element-submit">
            <input type="submit" className="btn btn-success submitbtn" />
          </div>
        </form>
        <div className="paradiv">
          <p>
            dont have accout ?<a href="/register"> register </a>here
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

import React, { useState } from "react";
import "../css/login.css";
import { useRef, useContext } from "react";
import axios from "axios";
import { Authcontext } from "../App";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const usernameref = useRef();
  const passwordref = useRef();
  const [errors,seterrors]=useState({})
  const { auth, setauth } = useContext(Authcontext);
  const navigate = useNavigate();
  const login = async (e) => {
    e.preventDefault();
    const username = usernameref.current.value;
    const password = passwordref.current.value;
    const data = { username, password };
    try {
      const res = await axios.post("http://127.0.0.1:8000/login/", data);
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
        seterrors(err.response.data)
      }
    }
  };
  return (
    <div className="logindiv">
      <h1>welcome to login page</h1>
      <div>
        <form onSubmit={login}>
          <div className="form-elements">
            <label htmlFor="username">username</label>
            <input type="text" name="username" required ref={usernameref} />
          </div>
          <div className="form-elements">
            <label htmlFor="password">password</label>
            <input type="password" name="password" required ref={passwordref} />
            {errors.message && (<p className="error-message">{errors.message}</p>)}
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

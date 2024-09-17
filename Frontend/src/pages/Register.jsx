import axios from "axios";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../css/register.css'

const Register = () => {
  const usernameref = useRef();
  const passwordref = useRef();
  const emailref = useRef();
  const navigate = useNavigate();
  const [backenderrors,setbackenderrors] = useState({})
  const register = async (e) => {
    e.preventDefault();
    const username = usernameref.current.value;
    const email = emailref.current.value;
    const password = passwordref.current.value;
    const data = { username, email, password };
    try {
      const res = await axios.post("http://127.0.0.1:8000/register/", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res) {
        console.log(res.data);
        navigate("/");
      }
    } catch (err) {
      if (err.response && err.response.data ){
      console.error("error", err.response.data);
      setbackenderrors(err.response.data)
      }
    }
  };
  return (
    <div className="registerdiv">
      <h1>welcome to register page</h1>
      <div>
        <form onSubmit={register}>
          <div className="form-elements">
            <label htmlFor="username">username</label>
            <input type="text" name="username" required ref={usernameref} />
             {backenderrors.username && (<p className="error-message" >{backenderrors.username[0]}</p>)} 
          </div>
          <div className="form-elements">
            <label htmlFor="password">password</label>
            <input type="password" name="password" required ref={passwordref} />
            {backenderrors.password && (<p className="error-message" >{backenderrors.password[0]}</p>)} 
          </div>
          <div className="form-elements">
            <label htmlFor="email">email</label>
            <input type="email" name="email" required ref={emailref} />
            {backenderrors.email && (<p className="error-message" >{backenderrors.email[0]}</p>)} 
          </div>
          <div className="form-element-submit">
            <input type="submit" className="btn btn-success submitbtn" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;

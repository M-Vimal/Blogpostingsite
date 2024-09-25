import axios from "axios";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../css/register.css'
import { RiLockPasswordFill } from "react-icons/ri";
import { FaUserAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

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
      const res = await axios.post("https://vimalganesh.pythonanywhere.com/register/", data, {
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
      <div className="inside-reg-div">
        <form onSubmit={register}>
          <div className="form-elements">
            <input type="text" name="username" required ref={usernameref} placeholder="username" />
             {backenderrors.username && (<p className="error-message" >{backenderrors.username[0]}</p>)} 
             <FaUserAlt className="icon" />
          </div>
          <div className="form-elements">
            <input type="password" name="password" required ref={passwordref} placeholder="password"/>
            <RiLockPasswordFill className="icon" />
            {backenderrors.password && (<p className="error-message" >{backenderrors.password[0]}</p>)} 
          </div>
          <div className="form-elements">
            <input type="email" name="email" required ref={emailref} placeholder="email" />
            <MdEmail  className="icon" />
          {backenderrors.email && (<p className="error-message" >{backenderrors.email[0]}</p>)} 
          </div>
          <div className="form-element-submit">
            <input type="submit" className="btn btn-success submitbtn" />
          </div>
        </form>
        <div className="paradiv">
          <p>
            Already have an account?<a href="/login">login</a> here
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

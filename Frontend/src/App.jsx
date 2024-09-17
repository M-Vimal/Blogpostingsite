import React, { useState,useEffect } from "react";
import { createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Posts from "./pages/Posts";
import Register from "./pages/Register";
import Fullblog from "./pages/Fullblog";
import Create from "./components/Createblog";
import Update from "./components/Update";
import {Delete} from "./components/Delete";
import { Logout } from "./components/Logout";
export const Authcontext = createContext();

const App = () => {
  const [auth, setauth] = useState(()=>{
    const savedauth = localStorage.getItem('auth')
    return savedauth === 'true'
  })
  useEffect(() => {
    localStorage.setItem("auth", auth);
  }, [auth]);
  return (
    <div>
      <Authcontext.Provider value={{auth,setauth}}>
        <Navbar />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/myposts" element={<Posts />} />
            <Route path="/register" element={<Register />} />
            <Route path="/create" element={<Create />} />
            <Route path="/delete/:id" element={<Delete />} />
            <Route path="/update/:id" element={<Update />} />
            <Route path="/fullblog/:id" element={<Fullblog />} />
          </Routes>
        </BrowserRouter>
      </Authcontext.Provider>
    </div>
  );
};

export default App;

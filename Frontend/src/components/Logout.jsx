import React, { useEffect } from "react";
import axiosInstance from "./AxiosInstance";
import { useContext } from "react";
import { Authcontext } from "../App";
import { useNavigate } from "react-router-dom";
export const Logout = () => {
    const { auth, setauth } = useContext(Authcontext);
    const navigate = useNavigate()
  useEffect(() => {
    const logout = async (e) => {
      try{
        const res = await axiosInstance.post("logout/", {
          refresh: localStorage.getItem("refreshtoken"),
        });
        if (res) {
          console.log(res.data);
          localStorage.removeItem('accesstoken')
          localStorage.removeItem('refreshtoken')
          localStorage.removeItem('id')
          setauth(false)
          navigate('/')
  
        } else
          (err) => {
            console.error("error", err);
          };
      }
      catch (err){
        console.error("error",err);
        
      }

    };
    logout()
  }, []);
  return <div>Logging out...</div>;
};

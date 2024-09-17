import React from "react";
import { useNavigate } from "react-router-dom";
import { useParams, useLocation } from "react-router-dom";
import { useRef } from "react";
import axiosInstance from "./AxiosInstance";
import "../css/crud.css";

const Update = () => {
  const { id } = useParams();
  const location = useLocation();
  const { post } = location.state || {};
  const titleref = useRef(null);
  const descref = useRef(null);
  const imageref = useRef(null);
  const navigate = useNavigate();
  const updatepost = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", titleref.current.value);
    formData.append("author", localStorage.getItem("id"));
    formData.append("desc", descref.current.value);
    if (imageref.current.files[0]){
      formData.append("image", imageref.current.files[0]);
    }
    try {
      const res = await axiosInstance.patch(`myposts/update/${id}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res) {
        console.log(res.data);
        navigate("/myposts");
      } else
        (err) => {
          console.error("error", err);
        };
    } catch (err) {
      console.error("error", err);
    }
  };

  return (
    <div className="crud-div">
      <h1>make your update</h1>
      <form onSubmit={updatepost}>
        <div className="formelement">
          <label>Title</label>
          <input type="text" defaultValue={post.title} ref={titleref} />
          <label>Description:</label>
          <textarea defaultValue={post.desc} ref={descref} />
          <label>Image:</label>
          <input type="file" ref={imageref} />
          <button type="submit" className="btn btn-success" id="update-btn" >Update</button>
        </div>
      </form>
    </div>
  );
};

export default Update;

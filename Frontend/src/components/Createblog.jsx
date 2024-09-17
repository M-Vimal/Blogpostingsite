import React, { useRef } from "react";
import axiosInstance from "../components/AxiosInstance";
import { useNavigate } from 'react-router-dom'
import '../css/crud.css'
const Create = () => {
  const titleref = useRef(null);
  const descref = useRef(null);
  const imageref = useRef(null);
  const navigate = useNavigate()
  const create = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", titleref.current.value);
    formData.append("author", localStorage.getItem("id"));
    formData.append("desc", descref.current.value);
    formData.append("image", imageref.current.files[0]);
    console.log(formData);
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
    const res = await axiosInstance.post("myposts/create/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (res){
        console.log(res.data)
        navigate('/myposts')

    }
    else (err)=>{
        console.error("error",err)
    }
  };

  return (
    <div className="crud-div">
      <h1>write your blog</h1>
      <form onSubmit={create}>
        <div className="formelement">
        <label>Title</label>
        <input type="text" name="title" ref={titleref} />
        <label>Image</label>
        <input type="file" name="image" ref={imageref} />
        <label>Desc</label>
        <textarea name="desc" ref={descref}></textarea>
        <input type="submit" className="btn btn-success" id="btn-create" value="create" />
        </div>
      </form>
    </div>
  );
};

export default Create;

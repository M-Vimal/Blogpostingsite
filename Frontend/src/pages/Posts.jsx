import React, { useEffect, useState } from "react";
import axiosInstance from "../components/AxiosInstance";
import {Link} from "react-router-dom"
import '../css/post.css'


const Posts = () => {
  const [mypost, setmypost] = useState([]);

  useEffect(() => {
    const myposts = async () => {
      try {
        const res = await axiosInstance.get("myposts/");
        if (res) {
          console.log(res.data);
          setmypost(res.data);
        } else
          (err) => {
            console.error("error", err);
          };
      } catch (err) {
        console.error();
      }
    };
    myposts();
  }, []);
  return (
    <div className="mypost" >
      <h1 className="title">myposts</h1>
      <div className="addpost">
      <a href="/create" ><p id="addroute">Add post</p></a>
      </div>
      <div className="mypostdiv">
        {mypost.map((post, index) => (
          <div key={index} className="mypostcard">
          <div className="mypostimagediv">
            <img src={post.image} alt={post.title} id="image" />
            <p id="date">{post.date}</p>
          </div>
            <p id="myposttitle">{post.title}</p>
            <div className="btndiv">
              <Link to={`/fullblog/${post.id}`}><button className="btn btn-outline-primary" id="view">View</button></Link>
              <Link to={`/update/${post.id}`} state={{post}}><button className="btn btn-outline-success" id="update">Update</button></Link>
              <Link to={`/delete/${post.id}`}><button className="btn btn-outline-danger" id="del">Delete</button></Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../css/fullblog.css";
const Fullblog = () => {
  const { id } = useParams();
  const [blog, setblog] = useState([]);
  useEffect(() => {
    const singleblog = async () => {
      try {
        const res = await axios.get(
          `https://vimalganesh.pythonanywhere.com/singleblog/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (res) {
          console.log(res.data);
          setblog(res.data);
        } else
          (err) => {
            console.error("error", err);
          };
      } catch (err) {
        console.error("error", err);
      }
    };
    singleblog();
  }, []);

  return (
    <div className="fullblogdiv">
      <div className="imagediv">
        <img
          src={`https://vimalganesh.pythonanywhere.com/${blog.image}`}
          alt={blog.title}
          className="blog-image"
        />
        <p id="date">{blog.date}</p>
      </div>
      <div className="descdiv">
        <h1>{blog.title}</h1>
        <p>{blog.desc}</p>
      </div>
    </div>
  );
};

export default Fullblog;

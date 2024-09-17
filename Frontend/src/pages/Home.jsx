import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/home.css"
import {Link} from "react-router-dom"
const Home = () => {
  const [posts, setposts] = useState([]);
  useEffect(() => {
    const home = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/", {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res) {
          console.log(res.data);
          setposts(res.data);
        } else
          (err) => {
            console.error("error", err);
          };
      } catch (err) {
        console.error("error", err);
      }
    };

    home();
  }, []);





  return (
    <div className="blog-container">
      <h1>read your favorite blogs </h1>
      <div className="posts-grid">
        {posts.map((post,index)=>(
          <div key={index} className="post-card">
            <div className="blogimagediv">
            <img  src={`http://127.0.0.1:8000/${post.image}`} alt={post.title} id="blogimage"/>
            <p>{post.date}</p>
            </div>
            <h1 id="blogtitle">{post.title}</h1>
            <Link to={`/fullblog/${post.id}`}>view</Link>
          </div>
        ))
        }     
      </div>
    </div>
  );
};

export default Home;

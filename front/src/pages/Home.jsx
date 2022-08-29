import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Posts/Card";
import PostOnePost from "../components/Posts/Post";
import { BsFillArrowUpCircleFill } from "react-icons/bs";


const Home = () => {
  const [posts, setPosts] = useState([]);

  // boutton remonte page
  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const fetchPosts = useCallback(async () => {
      const res = await axios.get("http://localhost:4200/api/posts/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setPosts(res.data.data);
  }, [])

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts]);


  return (
    <div>
      <PostOnePost refetch={fetchPosts}/>
      {posts.map((item) => (
        <Card refetch={fetchPosts} key={item.id} { ...item}/>
      ))}
      <BsFillArrowUpCircleFill className="scrollTop" onClick={scrollTop} />
    </div>
  );
};

export default Home;
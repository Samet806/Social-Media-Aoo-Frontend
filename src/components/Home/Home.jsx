import React from "react";
import Post from "../Post/Post";
import  { useEffect, useState } from 'react'
import './Home.css'
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { ClassNames } from "@emotion/react";
import PostForm from "../Post/PostForm";

const Home = () => {
  const [postlist, setPost] = useState([]);
  const [isLoaded, setisLoaded] = useState(false);
  const [error, setError] = useState(null);

  const refreshPost=()=>{
    fetch("/posts")
    .then((response) => response.json())
    .then(
      (result) => {
        
        setPost(result);
        setisLoaded(true);
      },
      (error) => {
        setisLoaded(true);
        setError(error);
      }
    );

  }
  useEffect(() => {
    refreshPost();
  }, []);

  if (error) {
    return <div>Error!!!</div>;
  } else if (!isLoaded) {
    return <div>Bekleyiniz</div>;
  } else {
    return (
<div className="container" >
    <PostForm userId={1} userName={"ddd"}  refreshPost={refreshPost}/>
   {
   postlist.map((post) => (
    <Post likes={post.postLikes} userId={post.userId} postId={post.id} userName={post.userName} title={post.title} text={post.text} ></Post>
  ))}
</div>

  
    );
  }
};

export default Home;

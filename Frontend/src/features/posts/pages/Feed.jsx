import React, { useEffect } from "react";
import "../styles/feed.scss";
import Post from "../components/Post";
import { usePost } from "../hooks/usePost";
import Navbar from "../../shared/components/Navbar";
const Feed = () => {

  const {feed,handleGetFeed,loading,handleLikePost,handleUnlikePost} = usePost();
 useEffect(()=>{
    handleGetFeed();
 },[]);

 if(loading || !feed){
  return ( <main><h1>Feed is loading...</h1></main>)
 }
  console.log(feed);
  
  return (
    <main className="feed-page">
      <Navbar/>
      <div className="Feed">
        <div className="posts">
          {feed.map(post => {
            return <Post user={post.user} post={post} loading={loading} handleLikePost={handleLikePost} handleUnlikePost={handleUnlikePost} />;
          })}
        </div>
      </div>
    </main>
  );
};

export default Feed;

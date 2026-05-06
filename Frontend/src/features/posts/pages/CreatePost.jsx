import React,{useState,useRef} from "react";
import "../styles/createPost.scss";
import { usePost } from "../hooks/usePost";
import { useNavigate } from "react-router"
const CreatePost = () => {
  const [caption, setCaption] = useState("");
  const postImageInputFieldRef = useRef(null);
  const {loading, handleCreatePost} = usePost();
  const naviagte = useNavigate();
  async function handleSubmit(e){

    e.preventDefault();
    const file = postImageInputFieldRef.current.files[0];
    await handleCreatePost(file,caption);
    naviagte("/");
  
  }
  if(loading){
    return (<main><h1>creating Post...</h1></main>)
  }
  return (
    <main className="create-post-page">
      <div className="form-container">
        <h1>Create Post </h1>
        <form action=""
        onSubmit={handleSubmit}
        >
          
          <label className="create-post-label" htmlFor="postImage">
            
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M21 15V18H24V20H21V23H19V20H16V18H19V15H21ZM21.0082 3C21.556 3 22 3.44495 22 3.9934V13H20V5H4V18.999L14 9L17 12V14.829L14 11.8284L6.827 19H14V21H2.9918C2.44405 21 2 20.5551 2 20.0066V3.9934C2 3.44476 2.45531 3 2.9918 3H21.0082ZM8 7C9.10457 7 10 7.89543 10 9C10 10.1046 9.10457 11 8 11C6.89543 11 6 10.1046 6 9C6 7.89543 6.89543 7 8 7Z"></path>
              </svg>
              <p>upload image</p>
           
          </label>
          <input ref={postImageInputFieldRef} required hidden type="file" name="postImage" id="postImage"  />
          
          <input
            type="text"
            value={caption}
            onChange={(e)=>{
              setCaption(e.target.value);
            }}
            placeholder="Enter caption"
            name="caption"
            id="caption"
          />
          <button className="button primary-button">create post</button>
        </form>
      </div>
    </main>
  );
};

export default CreatePost;

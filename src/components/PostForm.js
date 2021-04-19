import React, { useState, useEffect } from "react";
import { post, postFile } from "../utils/requests";
import "./UniqueBoard.scss";

export default function PostForm(props) {
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [file,setFile] = useState("")


  // const [error, setError] = useState("");
  const [isOn, setisOn] = useState(false);
  useEffect(() => {
    console.log(props);
    setisOn(props.isFormOn);
  }, [props]);

  const createPost = async (e) => {
    e.preventDefault();
    const boardId = window.location.pathname;
    let body = JSON.stringify({ title: postTitle, body: postContent});
    const result = await post(boardId + "/post", body).then(e=>e.json());
    
    let file_id = result.file_id
    let form = new FormData()
    form.append('file',file)
    postFile(form,file_id)
    window.location.reload(false);
  };
  return isOn ? (
    <div className="post-container">
      <form onSubmit={createPost} className="">
        {/* <p className="error">{error}</p> */}
        <label>
          <input
            type="text"
            style={{ width: "250px" }}
            placeholder="Post title"
            onChange={(e) => setPostTitle(e.target.value)}
          />
        </label>
        <label>
          <textarea
            rows="10"
            cols="50"
            placeholder="Post content"
            onChange={(e) => setPostContent(e.target.value)}
          />
        </label>

        <label>
          <input
            type="file"
            style={{ width: "250px" }}
            placeholder="Post title"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  ) : (
    <></>
  );
}

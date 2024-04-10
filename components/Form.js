"use client";

import Image from 'next/image'

import React, { useState } from 'react';
import { UploadButton,UploadDropzone } from '@utils/uploadthing';

function Form({ type, post, setPost, isSubmitting, createpost, cancel }) {

  const [imageuploading, setimageuploading] = useState(false)
  const handleCaptionChange = (event) => {
    setPost({ ...post, caption: event.target.value })
  };



  return (
    <div className='containerbox'>
      {/* <h2>Create a Post</h2> */}
      <div className='form-container '>
        <form onSubmit={createpost} className="post_form">
          {type=="update"?<Image style={{width:"100%" ,height:"auto"}} src={post?.imageUrl} height={400} width={400}
          alt="postiamge" />:<>
          {!imageuploading? <UploadDropzone
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              console.log("Files: ", res);
              setPost({ ...post, imageUrl: res[0].url })
              setimageuploading(true)
            }}
            onUploadError={(error) => {
              alert(`ERROR! ${error.message}`);
            }}
          />:<Image style={{width:"100%" ,height:"auto"}} src={post?.imageUrl} height={400} width={400}
          alt="postiamge" />}
          
          </>}
          <div></div>
          
         
           
          <div className='input-container ' >
            <label htmlFor="caption"></label>
            <textarea id="caption" value={post.caption} onChange={handleCaptionChange} placeholder="Write your caption" />
          </div>
          <div className='input-container ' style={{ height: "50%" }}>
            <label htmlFor="tags">#</label>
            <input id="tags" value={post.tags} onChange={(e) => setPost({ ...post, tags: e.target.value })} placeholder="Tags (e.g, #life)" />
          </div>
          <div style={{display:"flex" }} className={"action_bar"}> 
          {
            type=="update"? <button type="submit" className={"navitems signout"} 
            >Update Post</button>: <button type="submit" className={imageuploading?'navitems signout ':"navitems signout disabled"} 
            disabled={!imageuploading}>Create Post</button>
          }
          

          <button onClick={() => cancel()} className='navitems ' style={{color:"white"}}
            > Cancel</button></div>
          
        </form>
      </div>
    </div>
  );
}

export default Form;

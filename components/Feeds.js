"use client";

import React, { useEffect, useState } from 'react'
import Card from './Card'
import Search from './Search';
import { Placeholder } from 'rsuite';
import { Loader } from 'rsuite';
import { Input, InputGroup } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';

const styles = {
  width: "95%",
  margin: 10
};
const Feeds = () => {
const [posts, setposts] = useState([])
const [serchedText, setserchedText] = useState("")
  useEffect(() => {
    const fetchPosts = async () =>{
      const response = await fetch('/api/post');
      const data = await response.json();
      // setPosts(data);

      setposts(data)
    }
      
      fetchPosts();
    }, []);
  
  return (
    <main className="card_grid">

      <div className='search_cmp'>
        <Search serchedText={serchedText} setserchedText={setserchedText} ></Search>
      </div>
      <div className='mobile_srch'>
      <InputGroup inside style={{
  width: "95%",
  margin: 10
}}>
                <Input placeholder='Search' value={serchedText} onChange={(e)=>setserchedText(e)} />
                <InputGroup.Button>
                    <SearchIcon />
                </InputGroup.Button>
            </InputGroup>
      </div>
      {posts?.length==0?
        <div>
        <Placeholder.Paragraph rows={8} />
        <Loader backdrop content="loading Feeds..." vertical />
    </div> 
      :<></>}
      {
       [...posts]?.reverse().filter(post => 
        post.caption.toLowerCase().includes(serchedText.toLowerCase()) || 
        post.tags.toLowerCase().includes(serchedText.toLowerCase()) ||
        post?.creator?.username.toLowerCase().includes(serchedText.toLowerCase()) 

    ).map((e, i) => (
          <Card data={e} key={i} />
        ))
      }
    </main>
  )
}

export default Feeds
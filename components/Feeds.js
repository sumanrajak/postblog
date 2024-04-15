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
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/post');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        // Show an alert if there's an error fetching the posts
        alert('An error occurred while fetching posts. Please reload the page.');
        reloadPage(); // Reload the page
      }
    }

    fetchPosts();
  }, []);


  const reloadPage = () => {
    window.location.reload(); // Reload the page
  };


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
          <Input placeholder='Search' value={serchedText} onChange={(e) => setserchedText(e)} />
          <InputGroup.Button>
            <SearchIcon />
          </InputGroup.Button>
        </InputGroup>
      </div>
      {posts?.length == 0 ?
        <div>
          <Placeholder.Paragraph rows={8} />
          <Loader backdrop content="loading Feeds..." vertical />
        </div>
        : <></>}
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
"use client";

import Profile from '@components/Profile'
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react';
import { Placeholder } from 'rsuite';
import { Loader } from 'rsuite';
import { useRouter } from 'next/navigation';

const UserProfile = ({ params }) => {
  const [userInfo, setuserInfo] = useState([])
  const [posts, setposts] = useState([])
  const { data: session } = useSession();
  const router=useRouter()
  const handelUpdatePost = () => {
  }
  const handelDeltPost = (id) => {

  }
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params.id}/post`)
      const data = await response.json();
      setposts(data)
      // console.log("posts", data);
    }
    const fetchUser = async () => {
      const response = await fetch(`/api/users/${params.id}`)
      const data = await response.json();
      setuserInfo({ user: { ...data, name: data.username } })
      // console.log("user", data);
    }
    fetchUser()
    fetchPosts();
  }, []);

 
  
  return (
    <div style={{ display: "flex", justifyContent: "center" }} className="bg_color">
      {
        !userInfo || posts.length == 0 ? <div>
          <Placeholder.Paragraph rows={8} />
          <Loader backdrop content="loading..." vertical />
        </div> : <Profile
          type={userInfo?._id==session?.user.id?"myprofile":"userprofile"}
          profileInfo={userInfo}
          handelDeltPost={handelDeltPost}
          handelUpdatePost={handelUpdatePost}
          posts={posts}
        />
      }

    </div>
  )
}

export default UserProfile
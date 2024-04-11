"use client";

import Profile from '@components/Profile'
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react';
import { Placeholder } from 'rsuite';
import { Loader } from 'rsuite';
import { useRouter } from 'next/navigation';

const ProfilePage = () => {
  const router = useRouter()
  const { data: session } = useSession();
  const [posts, setposts] = useState([])
  const handelUpdatePost = () => {


  }
  const handelDeltPost = (id) => {
    const confirmdelt = confirm("are you sure to delete this post " + id)
    if (confirmdelt) {
      try {
        const response = fetch(`/api/post/${id}`,
          {
            method: 'DELETE',

          })

        if (response.ok) {
          router.push('/')
        }

      } catch (error) {
        console.log(error);
      } finally {
        router.push('/')

      }
    }
  }
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session.user.id}/post`)
      const data = await response.json();
      setposts(data)
      // console.log("posts", data);
    }

    if (session?.user.id) fetchPosts();
  }, [session]);

  return (
    <div style={{ display: "flex", justifyContent: "center" }} className="bg_color">
      {
        !session ? <div>
          <Placeholder.Paragraph rows={8} />
          <Loader backdrop content="loading..." vertical />
        </div> : <Profile
          type="myprofile"
          profileInfo={session}
          handelDeltPost={handelDeltPost}
          handelUpdatePost={handelUpdatePost}
          posts={posts}
        />
      }

    </div>
  )
}

export default ProfilePage
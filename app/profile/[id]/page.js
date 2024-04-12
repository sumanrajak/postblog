"use client";

import Profile from '@components/Profile'
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react';
import { Placeholder } from 'rsuite';
import { Loader } from 'rsuite';
import { useRouter } from 'next/navigation';

const UserProfile = ({ params }) => {
  const [userInfo, setuserInfo] = useState([])
  const [isLoading, setisLoading] = useState(true)
  const [posts, setposts] = useState([])
  const { data: session } = useSession();
  const router=useRouter()
  const handelUpdatePost = () => {
  }
  const handelDeltPost = (id) => {

  }

  useEffect(()=>{
if(session?.user?.id===params.id)router.push("/profile");
  },[session])
  useEffect(() => {
    const fetchData = async () => {
      const userresponse = await fetch(`/api/users/${params.id}`)
      const userdata = await userresponse.json();
      setuserInfo({ user: { ...userdata, name: userdata.username } })
      const response = await fetch(`/api/users/${params.id}/post`)
      const data = await response.json();
      setposts(data)
      setisLoading(false)

    }
   
    fetchData();

  }, []);

 
  
  return (
    <div style={{ display: "flex", justifyContent: "center" }} className="bg_color">
      {
        isLoading  ? <div>
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
      {userInfo?<></>:<>User Not found</>}

    </div>
  )
}

export default UserProfile
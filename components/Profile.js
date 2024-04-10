import Image from 'next/image'
import React from 'react'
import Card from './Card'
import ProfileCard from './ProfileCard'

const Profile = ({profileInfo,handelDeltPost,handelUpdatePost,posts,type}) => {

  return (
    <div className='Profile_container bg_color'>
      <div className='profile_info'>
      
      <ProfileCard profileInfo={profileInfo} follower={posts.length} post={posts.length} type={type}></ProfileCard>
      </div>
      <div className='profile_grid'>
        {
         posts?.map((e, i) => (
          <Card data={e} key={i} handelDeltPost={handelDeltPost} type={"editable"}  />
        ))
        }
      </div>

    </div>
  )
}

export default Profile
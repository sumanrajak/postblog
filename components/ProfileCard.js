import Image from 'next/image'
import React from 'react'
import '../styles/profile.css'

const ProfileCard = ({profileInfo,post,follower,type}) => {
  return (<div className='ProfileCard'>
 <div id="card">
  <Image id="avatar" src={profileInfo?.user?.image} height={40} width={40}
          alt="userimage" />
  <div id="info" style={{height:type=="myprofile"?"50%":"100%"}}>
    <p id="name">{profileInfo?.user?.name}</p>
    <p id="activity">{profileInfo?.user?.email}</p>
    <div id="stats">
      <p className="stats-text">
        <svg viewBox="0 0 24 24">
          <path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z" />
        </svg>
        <span>{follower}</span>
        followers
      </p>
      <p className="stats-text">
        <svg viewBox="0 0 24 24">
          <path d="M12 9a3.75 3.75 0 100 7.5A3.75 3.75 0 0012 9z" />
          <path fillRule="evenodd" d="M9.344 3.071a49.52 49.52 0 015.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 01-3 3h-15a3 3 0 01-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 001.11-.71l.822-1.315a2.942 2.942 0 012.332-1.39zM6.75 12.75a5.25 5.25 0 1110.5 0 5.25 5.25 0 01-10.5 0zm12-1.5a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
        </svg>
        <span>{post}</span>
        photos
      </p>
      <p className="stats-text">
        <svg viewBox="0 0 24 24">
          <path d="M5.566 4.657A4.505 4.505 0 016.75 4.5h10.5c.41 0 .806.055 1.183.157A3 3 0 0015.75 3h-7.5a3 3 0 00-2.684 1.657zM2.25 12a3 3 0 013-3h13.5a3 3 0 013 3v6a3 3 0 01-3 3H5.25a3 3 0 01-3-3v-6zM5.25 7.5c-.41 0-.806.055-1.184.157A3 3 0 016.75 6h10.5a3 3 0 012.683 1.657A4.505 4.505 0 0018.75 7.5H5.25z" />
        </svg>
        <span>{post}</span>
        posts
      </p>
    </div>
    {type!="myprofile"?<p id="btn">Follow</p>:<></>}
  </div>
</div>
  </div>
   
  )
}

export default ProfileCard
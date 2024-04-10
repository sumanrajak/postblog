"use client";

import Image from 'next/image'
import React from 'react'
import { Badge, Button } from 'rsuite';
import TrashIcon from '@rsuite/icons/Trash';
import EditIcon from '@rsuite/icons/Edit';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Card = ({ data ,handelDeltPost,type}) => {
  const { data: session } = useSession();
  const  router=useRouter()

const editpost=()=>{
  console.log(data);
  router.push(`/updatePost/${data?._id}`)
}
const goToProfile=(id)=>{
  router.push(`/profile/${id}`)
}

  return (
    <section className="card blue">
      <div style={{ display: "flex", flexDirection: "colomn", justifyContent: "space-between", alignItems: "center" }}>
        <div className='user_bar'>
          <Image className="avatar" src={data?.creator?.image} height={40} width={40} onClick={()=>{goToProfile(data?.creator._id)}}
            alt="user" />
          <p style={{cursor:"pointer"}} onClick={()=>{goToProfile(data?.creator._id)}}>{data?.creator?.username}</p>
        </div>
        {data?.creator?._id == session?.user.id && type=="editable" ? <div style={{ display: "flex", flexDirection: "colomn", justifyContent: "space-between", alignItems: "center", width: "40px", marginRight: "10px" }}>
          <EditIcon style={{  cursor:"pointer"}}  onClick={editpost}></EditIcon>
          <TrashIcon style={{ color: "red" , cursor:"pointer"}} onClick={()=>handelDeltPost(data?._id)}></TrashIcon>
        </div> : <></>}
      </div>

      <Image className="card_img" src={data?.imageUrl} height={400} width={400}
        alt="postiamge" />

      <p className="card_title">{data?.caption}</p>
      <p className="card_content" style={{ opacity: "0.6" }}>{data?.tags}</p>
      <div  >
        <Badge content={9} className="card_content">
          <Button>Like</Button>
        </Badge>

        <Badge content={10} className="card_content">
          <Button>Comments</Button>
        </Badge>
      </div>
    </section>
  )
}

export default Card
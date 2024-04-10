"use client";

import Form from '@components/Form'
import React, { useState } from 'react'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const CreatePost = () => {
   const router = useRouter()
const { data: session } = useSession();
const [isSubmitting, setisSubmitting] = useState(false)
const [post, setPost] = useState({
    caption:"",
    tags:"",
    imageUrl:"",
})
const createPost=(e)=>{
    e.preventDefault()
    // console.log(post);
    setisSubmitting(true)
    try {
        const response= fetch('api/post/new',
        {
            method:'POST',
            body:JSON.stringify({
                caption:post.caption,
                imageUrl:post.imageUrl,
                tags:post.tags,
                userId: session?.user.id
            })
        })

        if (response.ok){
            router.push('/')
        }
       
    } catch (error) {
        console.log(error);
    } finally{
        setisSubmitting(false)
        router.push('/')

    }
}
const cancel=()=>{
    router.push('/')
}
    return (
        <div>
            <Form
            type="create"
            post={post}
            setPost={setPost}
            isSubmitting={isSubmitting}
            createpost={createPost}
            cancel={cancel}
            />
        </div>
    )
}

export default CreatePost
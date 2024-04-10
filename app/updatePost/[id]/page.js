"use client";

import React, { useEffect, useState } from 'react'
import Form from '@components/Form'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Placeholder } from 'rsuite';
import { Loader } from 'rsuite';

const UpdatePage = ({ params }) => {
    const router = useRouter()
    const [post, setPost] = useState(null)
    const [isSubmitting, setisSubmitting] = useState(false)
    const UpdatePost = (e) => {
        e.preventDefault()
        // console.log(post);
        setisSubmitting(true)
        try {
            const response = fetch(`/api/post/${params.id}`,
                {
                    method: 'PATCH',
                    body: JSON.stringify({
                        caption: post.caption,
                        tags: post.tags,
                    })
                })

            if (response.ok) {
                router.push('/')
            }

        } catch (error) {
            console.log(error);
        } finally {
            setisSubmitting(false)
            router.push('/')

        }
    }
    const cancel = () => {
        router.push('/')
    }
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`/api/post/${params.id}`)

            const data = await response.json()

             setPost({
                caption:data.caption,
                tags:data.tags,
                imageUrl:data.imageUrl,
            })
        }
        if (params.id) fetchData()
    }, [])

    return (
        <div>{post ? <Form
            type="update"
            post={post}
            setPost={setPost}
            isSubmitting={isSubmitting}
            createpost={UpdatePost}
            cancel={cancel}
        /> : <div>
            <Placeholder.Paragraph rows={8} />
            <Loader backdrop content="loading..." vertical />
        </div>}

        </div>
    )
}

export default UpdatePage
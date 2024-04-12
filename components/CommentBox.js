"use client";


import { formatInstagramTimestamp } from '@utils/helperFunction';
import { fetchData } from 'next-auth/client/_utils';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { Modal, Button, Toggle, ButtonToolbar, Placeholder } from 'rsuite';
import { Input, InputGroup } from 'rsuite';
import { useSession } from 'next-auth/react';
import { Loader } from 'rsuite';
const styles = {
    width: "95%",
    margin: 10
};

const CommentBox = ({ overflow, open, handleClose, id }) => {
    const [comments, setcomments] = useState([])
    const [newcomments, setnewcomments] = useState("")
    const [isSubmitting, setisSubmitting] = useState(false)
    const { data: session } = useSession();
    const [isLoading, setisLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/comments/${id}`)
                const data = await response.json()
                setcomments(data)
                setisLoading(false)

            } catch (error) {
                console.log(error);
            }

        }
        if (open) fetchData();
    }, [open])

    const addPost = () => {
        setisSubmitting(true)
        try {
            const response = fetch(`api/comments/${id}/add`,
                {
                    method: 'POST',
                    body: JSON.stringify({
                        text: newcomments,
                        userId: session?.user.id
                    })
                })

            if (response.ok) {
                setnewcomments("")
                setisSubmitting(false)

                handleClose()
            }

        } catch (error) {
            console.log(error);
            setnewcomments("error sending data")
            

        } finally {
            setnewcomments("")
            setisSubmitting(false)
            handleClose()

        }
    }
    return (
        <div>
            <Modal overflow={overflow} open={open} onClose={handleClose}>
                <Modal.Header>
                    <Modal.Title>Comments</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {isLoading? <div>
          <Placeholder.Paragraph rows={8} />
          <Loader backdrop content="loading..." vertical />
        </div> :<></>}
                    {
                        comments?.map(e => (
                            <div style={{ display: "flex", padding: "4px", gap: "10px" }} key={e.id}>
                                <div>
                                    <Image className="avatar" src={e.user.image} height={40} width={40}
                                        alt="user" /></div>
                                <div>
                                    <p style={{ fontSize: "small" }}>{e.user.username}</p>
                                    <p style={{ cursor: "pointer", margin: "0", fontSize: "xx-small" }} >{formatInstagramTimestamp(e.createdAt)}</p>
                                    <p style={{}}>{e.text}</p>
                                </div >
                            </div>
                        ))
                    }{comments?.length==0?<>No comments yet</>:<></>

                    }

                </Modal.Body>
                <Modal.Footer>
                    <InputGroup inside style={styles}>
{session?                        <Input placeholder='Write your comment' value={newcomments} onChange={(e) => setnewcomments(e)} />
:                        <Input placeholder='Sign in to comment' value={newcomments} disabled={true}  />
}
                    </InputGroup>{
                        session?<Button onClick={addPost} appearance="primary">
                        {isSubmitting? "sending": "Send"}
                    </Button>:<></>
                    }
                    
                    <Button onClick={handleClose} appearance="subtle">
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal></div>
    )
}

export default CommentBox
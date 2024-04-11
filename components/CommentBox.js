"use client";


import { formatInstagramTimestamp } from '@utils/helperFunction';
import { fetchData } from 'next-auth/client/_utils';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { Modal, Button, Toggle, ButtonToolbar, Placeholder } from 'rsuite';
import { Input, InputGroup } from 'rsuite';
import { useSession } from 'next-auth/react';

const styles = {
    width: "95%",
    margin: 10
};

const CommentBox = ({ overflow, open, handleClose, id }) => {
    const [comments, setcomments] = useState([])
    const [newcomments, setnewcomments] = useState("")
    const [isSubmitting, setisSubmitting] = useState(false)
    const { data: session } = useSession();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/comments/${id}`)
                const data = await response.json()
                setcomments(data)
            } catch (error) {
                console.log(error);
            }
           
        }
        if (open) fetchData();
    }, [open])

    const addPost=()=>{
        setisSubmitting(true)
        try {
            const response= fetch(`api/comments/${id}/add`,
            {
                method:'POST',
                body:JSON.stringify({
                    text:newcomments,
                    userId: session?.user.id
                })
            })
    
            if (response.ok){
                setnewcomments("")

            }
           
        } catch (error) {
            console.log(error);
            setnewcomments("")

        } finally{
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
                    {
                        comments?.map(e => (
                            <div style={{display:"flex",padding:"4px",gap:"10px"}}>
                                <div>
                                    <Image className="avatar" src={e.user.image} height={40} width={40}
                                        alt="user" /></div>
                                <div>
                                    <p style={{fontSize:"small"}}>{e.user.username}</p>
                                    <p style={{cursor:"pointer", margin:"0",fontSize:"xx-small"}} >{formatInstagramTimestamp(e.createdAt)}</p>
                                    <p style={{}}>{e.text}</p>
                                </div >
                            </div>
                        ))
                    }
                    
                </Modal.Body>
                <Modal.Footer>
                <InputGroup inside style={styles}>
                <Input placeholder='Write your comment' value={newcomments} onChange={(e)=>setnewcomments(e)} />
              
            </InputGroup>
                    <Button onClick={addPost} appearance="primary">
                        Send
                    </Button>
                    <Button onClick={handleClose} appearance="subtle">
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal></div>
    )
}

export default CommentBox
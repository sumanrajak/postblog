"use client";

import React, { useEffect, useState } from 'react'
import { Input, InputGroup } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const styles = {
    width: "95%",
    margin: 10
};
const Search = ({serchedText,
    setserchedText}) => {
    const  router=useRouter()

    const [users, setusers] = useState([])
    const goToProfile=(id)=>{
        router.push(`/profile/${id}`)
    }
    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('/api/users');
            const data = await response.json();
            // setPosts(data);
            setusers(data)
            // console.log("user", data);
        }

        fetchPosts();
    }, []);
    return (
        <div>
            <InputGroup inside style={styles}>
                <Input placeholder='Search' value={serchedText} onChange={(e)=>setserchedText(e)} />
                <InputGroup.Button>
                    <SearchIcon />
                </InputGroup.Button>
            </InputGroup>
            <div className="creatorList">
                <p>Populer Creators</p>


                {
                    users?.map(e => (
                        <div className='user_bar bar_hover' style={{justifyContent:"space-between"}}    key={e._id}            
                        >
                            <div style={{display:"flex",gap:"10px",justifyContent:"space-between",alignItems:"center"}}>
                            <Image className="avatar" src={e.image} height={40} width={40}
                                alt="user" />
                            <p>{e.username}</p>
                            </div>
                            <button
                className='navitems signout'
                type="button"
                style={{padding:"5px 10px"}}
                onClick={()=>{goToProfile(e._id)}}
                >
               View Profile
              </button>
                        </div>
                    ))

                }
            </div >

        </div>
    )
}

export default Search
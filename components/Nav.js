"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import {
  signIn, signOut, useSession,
  getProviders
} from 'next-auth/react';
import { Dropdown, Avatar } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';


const Nav = () => {
  const { data: session } = useSession()
  const [provider, setprovider] = useState(null)
  useEffect(() => {
    const setproviders = async () => {
      const response = await getProviders()
      setprovider(response)
    }
    setproviders()

  }, [])
  const renderToggle = props => (
    // <Image  size="s" src={session?.user.image} width="40" height="40" className='avatar' />
    <Avatar circle {...props} src={session?.user.image} />

  );
  return (
    <div className='navbar '>

      <div className=''>
        <Link href='/' className='link' style={{ color: "black",textDecoration:"none" }}>
          <h3>POST BLOG</h3>
        </Link>
      </div>
      {
        session?.user ? <div className='cent'>
          <div className='navitems'                 style={{padding:"5px 10px"}}
>
            <Link href='/createPost' className='link' style={{ color: "white",textDecoration:"none" }}>
              CREATE
            </Link>
          </div>
          {/* <div className='navitems signout' onClick={signOut}>
            SIGN OUT
          </div> */}
          <div className=''>
            {/* <Link href='./profile' className='link'> */}
            {session?.user.image ? <Dropdown renderToggle={renderToggle} placement="bottomEnd">
              <Dropdown.Item panel style={{ padding: 10, width: 260,  }}>
                <p>Signed in as</p>
                <strong>{session?.user.name}</strong>
                <p  style={{fontSize:"xs",  color:" #757575"}}>{session?.user.email}</p>

              </Dropdown.Item>
              <Dropdown.Separator />
              {/* <Dropdown.Item>Your profile</Dropdown.Item>
              <Dropdown.Item>Your stars</Dropdown.Item> */}
                <Dropdown.Item><Link href='/profile' className='link' > <div style={{color:"black",textDecoration:"none"}}>Your profile</div> </Link> </Dropdown.Item>
              <Dropdown.Separator />
              <Dropdown.Item>Help</Dropdown.Item>
              <Dropdown.Item>Settings</Dropdown.Item>
              <Dropdown.Item onClick={signOut}>Sign out</Dropdown.Item>
            </Dropdown> : <></>}
            {/* </Link> */}
          </div>
        </div> : <>
          {
            provider && Object.values(provider).map((provider) =>
              <button
                className='navitems signout'
                type="button"
                key={provider.name}
                onClick={() => signIn(provider.id)}
              >
                Sign In
              </button>
            )}
          {/* <div className='navitems' onClick={signout}>
            Login
          </div> */}
        </>
      }


    </div>
  )
}

export default Nav
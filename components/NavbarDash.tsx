import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const NavbarDash = () => {
  return (
    <header >
        <nav>
            
            <Link href='/' className='logo'>
             <Image src="/icons/logo.png" alt='logo' width={24} height={24}></Image>
             <p>DevEvent</p>
            </Link>

            <ul>
                <Link href='/'>Home</Link>
                <Link href='/events'>Events</Link>
                <Link href='/'>Create Event</Link>
                <Link href='/login'>Logout</Link>
                {/* <Link href='/signup'>Sign Up</Link> */}


            </ul>
        </nav>
      
    </header>
  )
}

export default NavbarDash

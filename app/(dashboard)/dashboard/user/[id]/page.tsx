"use client"
import { useParams } from 'next/navigation'
import React from 'react'

const UserDetails =  () => {
   const {id} =  useParams()
  return (
    <div>
       this is user Details {id}
    </div>
  )
}

export default UserDetails

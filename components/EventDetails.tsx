import { IEvent } from '@/database'
import axios from 'axios'
import Image from 'next/image'
import React from 'react'

const EVentDetailsPage =  async({params}:{params:Promise<{slug:string}>}) => {

   const {slug} = await params

//    console.log("slug", slug)
   const res =  await  axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/events/${slug}`)
   
  const  {event} =  res.data

//   console.log(event)

  return (
    <section id='event'>
       <div className="header">
          <h1>Event Description</h1>
          <p>{event.description}</p>
       </div>

       <div className="details">
         {/* Left side - event content */}
         <div className="content">
            <Image src={event.image} alt="Event banner" width={800} height={800} className='banner' />

            <section className='flex-col-gap-2'></section>
         </div>

         {/* Right side booking content */}
     b  
         <aside className='booking'>
            <p className='text-lg font-semibold'>Book Event</p>
         </aside>
       </div>
    </section>
  )
}

export default EVentDetailsPage

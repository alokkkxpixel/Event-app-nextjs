import { IEvent } from '@/database'
import EventCard from './EventCard'
import events from '@/lib/constants' assert { type: 'json' }
import axios from 'axios'
import { cacheLife } from 'next/cache'

const FeaturedEvents = async () => {

"use cache"
cacheLife('hours')

  //  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/events`)
  //  const data = await res.json()
 

  //  const events = data.event

  return (

   <>

    <div className='mt-20 space-y-7' id='events'>
        <h3>Featured Events</h3>
      <ul className='events list-none'>
       {events && events.length > 0 &&  events.map((event) => (
        <li key={event.title}>

            <EventCard  {...event}/>
        </li>
       ))}
      </ul>
    </div>
   </>

  )
}

export default FeaturedEvents

import { IEvent } from '@/database'
import EventCard from './EventCard'
import events from '@/lib/constants'
import axios from 'axios'
import { cacheLife } from 'next/cache'
const FeaturedEvents = async () => {

"use cache"
cacheLife('hours')

   const res = await fetch(`/api/events`)
   const data = await res.json()
 

   const events = data.event
  
  
      
  return (

   <>

    <div className='mt-20 space-y-7' id='events'>
        <h3>Featured Events</h3>
      <ul className='events list-none'>
       {events && events.length > 0 &&  events.map((event:IEvent) => (
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

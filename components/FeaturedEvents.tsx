import React from 'react'
import EventCard from './EventCard'
import events from '@/lib/constants'
const FeaturedEvents = () => {

    // const events = [
    //     { title:"Github Developer Events",
    //         image:"/images/event1.png"
    //     },
    //      { title:"Events 2",
    //         image:"/images/event2.png"
    //     },
    //      { title:"Events 3",
    //         image:"/images/event3.png"
    //     }
    // ]

  return (
    <div className='mt-20 space-y-7' id='events'>
        <h3>Featured Events</h3>
      <ul className='events list-none'>
       {events.map((event) => (
        <li key={event.title}>

            <EventCard  {...event}/>
        </li>
       ))}
      </ul>
    </div>
  )
}

export default FeaturedEvents

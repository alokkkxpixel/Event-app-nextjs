import { IEvent } from '@/database'
import EventCard from './EventCard'
import events from '@/lib/constants'
import axios from 'axios'
const FeaturedEvents = async () => {

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
   const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/events`)
     const events = await res.data.event

      
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

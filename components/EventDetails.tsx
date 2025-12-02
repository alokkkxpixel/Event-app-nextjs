import { IEvent } from '@/database'
import { getSimilarEventBySlug } from '@/lib/actions/event.actions'
import axios from 'axios'
import { cacheLife } from 'next/cache'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import React from 'react'
import BookEvent from './BookEvent'
import EventCard from './EventCard'

const EventDetailItem = ({ icon, alt, label }: { icon: string; alt: string; label: string; }) => (
   <div className="flex-row-gap-2 items-center">
      <Image src={icon} alt={alt} width={17} height={17} />
      <p>{label}</p>
   </div>
)




const EventAgenda = ({ agendaItems }: { agendaItems: string[] }) => (
   <div className="agenda">
      <h2>Agenda</h2>

      <ul>
         {agendaItems.map((item) => (
            <li key={item}>{item}</li>

         ))}
      </ul>
   </div>
)


const EventTags = ({ TagItem }: { TagItem: string[] }) => (
   <div className="tags flex gap-1.5 flex-wrap">
      {TagItem.map((tag) => (
         <div className="pill" key={tag}>{tag}</div>
      ))}

   </div>
)


const booking = 10

const EVentDetails =  async({params} : {params :Promise<{slug:string}>}) => {


const { slug } = await params
   const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/events/${slug}`)
  const data = await res.json()

//   console.log("data" , data)
   // if (data.status === 404 || data.status === 500|| !data.status === 200) {
   //    return notFound()
   // }


   const { event } = data


   if (!event) {

      return notFound()
   }



    const similarEvents: IEvent[] = (await getSimilarEventBySlug(slug)) ?? []



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

               <section className='flex-col-gap-2'>
                  <h2>Event Details</h2>
                  <EventDetailItem icon="/icons/calendar.svg" alt="calendar" label={event.date} />
                  <EventDetailItem icon="/icons/clock.svg" alt="clock" label={event.time} />
                  <EventDetailItem icon="/icons/pin.svg" alt="pin" label={event.location} />
                  <EventDetailItem icon="/icons/mode.svg" alt="mode" label={event.mode} />
                  <EventDetailItem icon="/icons/audience.svg" alt="audience" label={event.audience} />
               </section>

               <EventAgenda agendaItems={JSON.parse(event.agenda[0])} />



               <section className='flex-col-gap-2'>
                  <h2>About the Organizer</h2>
                  <p>{event.organizer}</p>
               </section>

               <EventTags TagItem={JSON.parse(event.tags[0])} />

            </div>

            {/* Right side booking content */}

            <aside className='booking'>
               <div className="signup-card">
                  <h2>Book Your Spot</h2>
                  {booking > 0 ? (
                     <p className='text-sm'>
                        Join {booking} people who have already booked their spot
                     </p>
                  ) : (
                     <p className='text-sm'>Be the first to book your spot!</p>

                  )}

                  <BookEvent  eventId={event._id } slug={slug}/>
               </div>
            </aside>


         </div>

         <div className="flex flex-col w-full gap-4 pt-10">
            <h2>Similar Events</h2>

            <div className="events">
               {similarEvents.length > 0 && similarEvents.map((e)=>(
                    <EventCard key={e.title} {...e} />
            ))}
            </div>
         </div>
      </section>
   )
}

export default EVentDetails

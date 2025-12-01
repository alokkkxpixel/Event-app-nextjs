import { IEvent } from '@/database'
import axios from 'axios'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import React from 'react'

const EventDetailItem = ({ icon, alt, label }: { icon: string; alt: string; label: string; }) => (
    <div className="flex-row-gap-2 items-center">
        <Image src={icon} alt={alt} width={17} height={17} />
        <p>{label}</p>
    </div>
)




 const EventAgenda = ({agendaItems}:{agendaItems:string[]}) =>(
    <div className="agenda">
        <h2>Agenda</h2>

        <ul>
            {agendaItems.map((item)=>(
               <li key={item}>{item}</li>

            ))}
        </ul>
    </div>
 )


 const EventTags = ({TagItem}:{TagItem:string[]}) =>(
    <div className="tags flex gap-1.5 flex-wrap">
        {TagItem.map((tag)=>(
            <div className="pill" key={tag}>{tag}</div>
        ))}

    </div>
 )

const EVentDetailsPage =  async({params}:{params:Promise<{slug:string}>}) => {

   const {slug} = await params

//    console.log("slug", slug)
   const res =  await  axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/events/${slug}`)
  
   if(res.status === 404 || res.status === 500){
    return notFound()
   }

   
  const  {event} =  res.data


  if(!event ) {

     return notFound()
  }

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

<EventTags TagItem={JSON.parse(event.tags)} />

         </div>

         {/* Right side booking content */}
     
         <aside className='booking'>
            <p className='text-lg font-semibold'>Book Event</p>
         </aside>
       </div>
    </section>
  )
}

export default EVentDetailsPage

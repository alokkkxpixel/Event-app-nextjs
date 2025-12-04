import BookEvent from '@/components/BookEvent'
import EventCard from '@/components/EventCard'
import EVentDetails from '@/components/EventDetails'
import { IEvent } from '@/database'
import { getSimilarEventBySlug } from '@/lib/actions/event.actions'
import axios from 'axios'
import { cacheLife } from 'next/cache'

import Image from 'next/image'
import { notFound } from 'next/navigation'
import React, { Suspense } from 'react'


const EVentDetailsPage = async ({ params }: { params: Promise<{ slug: string }> }) => {

  return (
   <main >
      <Suspense fallback={<div className='flex items-center justify-center text-3xl '><h1>Loading....</h1></div>}>
         <EVentDetails params={params} />
      </Suspense>
   </main>
  )
}

export default EVentDetailsPage

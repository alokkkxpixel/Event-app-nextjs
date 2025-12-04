import ExploreBtn from '@/components/ExploreBtn'
import FeaturedEvents from '@/components/FeaturedEvents'
import React from 'react'

const page = () => {
  return (
    <section className='text-white '>
       <h1 className='text-center captiazise'>The Hub for every Dev Event You can't Miss</h1>
       <p className='text-center mt-5'>Hackthons, MeetUps, and Conferences, all in One place</p>

       <ExploreBtn/>

       <FeaturedEvents  />
    </section>
  )
}

export default page

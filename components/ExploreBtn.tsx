"use client"

import Image from 'next/image'

const ExploreBtn = () => {
  return (
    <button id='explore-btn' className='mt-5 mx-auto' onClick={()=> console.log("click explore btn")}>
      
      <a href='#events' className='transition-all duration-300 ease-in-out'>Explore Events <Image  src="/icons/arrow-down.svg" alt="arrow-down"  width={20} height={20} /> </a>
    </button>
  )
}

export default ExploreBtn

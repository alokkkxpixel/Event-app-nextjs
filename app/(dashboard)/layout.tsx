import React from 'react'

const layout = ({children} :{children:React.ReactNode}) => {
  return (
    <div>
      
      <p className='text-center text-2xl my-10'>Dashboard Navbar</p>

      {children}
    </div>
  )
}

export default layout

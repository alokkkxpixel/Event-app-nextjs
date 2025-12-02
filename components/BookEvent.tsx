"use client"

import { useState } from "react"




 const BookEvent = () => {
      
const [email, setEmail] = useState('')
const [submitted, Setsubmitted] = useState(false)



   const handleSubmit = (e:React.FormEvent) =>{
    e.preventDefault()

    setTimeout(() => {
         Setsubmitted(true)
    }, 1000);
    
   }
 
 
  return (
    <div id="book-event">
    
    {submitted ? (
        <p className="text-sm"> Thank you for signing Up!</p>
    ) :(
       <form action="" onSubmit={handleSubmit}>
        <div>
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" value={email} name="" onChange={(e)=> setEmail(e.target.value)} placeholder="Enter your email address" />
          
        <button type="submit" className="button-submit">Submit</button>
        </div>
       </form>
    )}

  



    </div>
  )
}

export default BookEvent

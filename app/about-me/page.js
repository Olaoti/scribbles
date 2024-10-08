'use client'
import React, {useEffect, useState} from 'react'
import Modal from '../Components/Modal'
import { useForm, ValidationError} from '@formspree/react';
function page() {
  const [name, setName] = useState('')
  const [mail, setMail] = useState('')
  const [message, setMessage] = useState('')
  const [subject, setSubject] = useState('')
  const [state, handleSubmit] = useForm("xkgwarjz");
  const [submitted, setSubmitted] = useState(false)
useEffect(()=>{
  if(state.succeeded){
    setSubmitted(true)
    setMail('')
    setName('')
    setSubject('')
    setMessage('')
    setTimeout(()=>{
      setSubmitted(false)
    },4000)
    }
},[state.succeeded])


  return (
    <div className='about-me container'>
     {submitted&&<Modal type='info' msg="Mail sent! You'd hear from me soon"/>}
      <div className='wrap'>
        <h2>HELLO WORLD !</h2>
        <p>Welcome home! I'm Omotola, and I love writing about all the beautiful things in life. Some pieces may be short stories, Tech, others poems, and a few might escape categorization. So, grab a cup of coffee, and let's take a sip through my world :)</p>
        <p>Feel free to send me a message, I'd love to connect with you 😍 </p>
        <form onSubmit={handleSubmit}>
        <h2>Say Hi!</h2>
        <label htmlFor='name'>Your Name</label>
        <input type='text' name='name' id='name' required onChange={(e) => setName(e.target.value)} value={name}/>
        <label htmlFor='email'>Your Email</label>
        <input type='email' required name="_replyto" id='mail' onChange={(e) => setMail(e.target.value)} value={mail}/>
        <ValidationError 
        prefix="Email" 
        field="email"
        errors={state.errors}
      />
        <label htmlFor='subject'>Subject</label>
        <input type='subject' name='subject' id='subject' onChange={(e) => setSubject(e.target.value)} value={subject}/>
        <label htmlFor='message'>Your Message</label>
        <textarea id='message' required name='message' rows={10} onChange={(e) => setMessage(e.target.value)} value={message}/>
        <ValidationError 
        prefix="Message" 
        field="message"
        errors={state.errors}
      />
           <button type="submit" disabled={state.submitting}>
        {state.submitting?('Submitting...'):('Submit')}
      </button>
      </form>
      </div>
    </div>
  )
}

export default page

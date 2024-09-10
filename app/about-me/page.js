'use client'
import React, {useState} from 'react'

function page() {
  const [name, setName] = useState('')
  const [mail, setMail] = useState('')
  const [message, setMessage] = useState('')
  const [subject, setSubject] = useState('')

  return (
    <div className='about-me container'>
      <div className='wrap'>
        <h2>HELLO WORLD !</h2>
        <p>Welcome home! I'm Omotola, and I love writing about all the beautiful things in life. Some pieces may be short stories, Tech, others poems, and a few might escape categorization. So, grab a cup of coffee, and let's take a sip through my world :)</p>
        <p>Feel free to send me a message, I'd love to connect with you 😍 </p>
        <form>
        <h2>Say Hi!</h2>
        <label htmlFor='name'>Your Name</label>
        <input type='text' name='name' id='name' onChange={(e) => setName(e.target.value)} value={name}/>
        <label htmlFor='email'>Your Email</label>
        <input type='email' name='mail' id='mail' onChange={(e) => setMail(e.target.value)} value={mail}/>
        <label htmlFor='subject'>Subject</label>
        <input type='subject' name='subject' id='subject' onChange={(e) => setSubject(e.target.value)} value={subject}/>
        <label htmlFor='message'>Your Message</label>
        <textarea id='message' name='message' rows={10} onChange={(e) => setMessage(e.target.value)} value={message}/>
        <button>SEND</button>
      </form>
      </div>
  
    </div>
  )
}

export default page
import Link from 'next/link'
import React from 'react'

function Footers() {
  return (
    <div className='footer'>
      <div className='footer__section'>
        <div className='info'>
          <h3>Scree<span>bles...</span></h3>
          <p>Screebles is a collection of short stories, poems, tech articles and few uncategorized write-ups.</p>
        </div>
        <div className='links'> 
          <h4>Useful links</h4>
          <Link href={'/about-me'}><p>Contact Me</p></Link>
          <Link href='https://omotolaolaoti.netlify.app/' target='_blank'><p>My portfolio</p></Link>
        </div>
        </div>
        <div className='small-info'>All written and edited by Omotola Olaoti</div>
      </div>
  )
}

export default Footers

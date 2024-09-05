import React from 'react'

function HeadComments({username, payload}) {
  return (
    <div className='headcomments'>
      <div className='initial'>
        {username.slice(0,1)}
      </div>
    <div>
      <h3>{username}</h3>
        <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
        <p>{payload}</p>

        </pre>
        </div>
    </div>
  )
}

export default HeadComments

import React from 'react'

function Comments() {
  return (
    <div className='comnments'>
      <h4>Enjoyed this? Let me know!</h4>
        <form>
            <textarea id='comment' name='comment' rows={10} />
            <label>Name</label>
            <input type='text' name='name' id='name'/>
            <label>Mail</label>
            <input type='email' name='mail' id='mail'/>
            <label id='savelabel'><input type='checkbox' name='savename' id='radiobtn'/><span>Save my name, email, and website in this browser for the next time I comment.</span></label>
        </form>
      <button>Send a Mail!</button>
    </div>
  )
}

export default Comments

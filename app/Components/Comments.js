import React, { useContext, useEffect, useState } from 'react'
import { createSupabaseClient } from '@/utils/supabase/client'
import Modal from './Modal'
import { commentsContext } from '../wrapper'
import { ChangeContext } from '../wrapper'

function Comments({id}) {
  const changeset = useContext(ChangeContext)
const comments=useContext(commentsContext)

  const [commentLoading, setCommentLoading]=useState()
  const [modalOpened, setModal] = useState(false)
  const [type, setType] = useState('success')
  const [msg, setMsg] = useState('Comment sent successfully!')

  const [name, setName] = useState('')
  const [mail, setMail] = useState('')
  const [comment, setComment] = useState('')
  const [replyTo, setReplyTo] = useState(null)
  const supabase = createSupabaseClient();
  function displaModal(){
    setTimeout(()=>{
      setModal(false)
    },4000)
  }

  const submitForm = async(e)=>{
    setCommentLoading(true)
    e.preventDefault()
    const { data, error } = await supabase
      .from('Commentsection')
      .insert([
        {
          post_id: id,
          username:name,
          mail:mail,
          payload:comment,
          reply_to:replyTo
        },
      ]);
      if(error){
        window.alert(error?.message);
      }
      else{
      changeset.setChange(true)
      setCommentLoading(false)
      setModal(true)
      displaModal()
      setName('')
      setMail('')
      setComment('')
      
    }
  }
  return (
    <div className='comnments'>
      {modalOpened&&<Modal type={type} msg={msg}/>}
      <h4>Enjoyed this? Drop a comment!</h4>
        <form onSubmit={submitForm}>
            <textarea id='comment' name='comment' rows={10} onChange={(e) => setComment(e.target.value)} value={comment}/>
            <label>Name</label>
            <input type='text' name='name' id='name' onChange={(e) => setName(e.target.value)} value={name}/>
            <label>Mail</label>
            <input type='email' name='mail' id='mail' onChange={(e) => setMail(e.target.value)} value={mail}/>
            <label id='savelabel'><input type='checkbox' name='savename' id='radiobtn' /><span>Save my name and email in this browser for the next time I comment.</span></label>
            <button>{commentLoading?('Loading...'):('Send a Comment!')}</button>
        </form>
    </div>
  )
}

export default Comments

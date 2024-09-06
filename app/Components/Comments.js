import React, { useContext, useEffect, useState } from 'react'
import { createSupabaseClient } from '@/utils/supabase/client'
import Modal from './Modal'
import { commentsContext } from '../wrapper'
import { ChangeContext } from '../wrapper'
import { ReplyContext } from '../[slug]/page'

function Comments({id,replyTo,parentId}) {
  const isReply= useContext(ReplyContext)
  const changeset = useContext(ChangeContext)
const comments=useContext(commentsContext)

  const [commentLoading, setCommentLoading]=useState()
  const [modalOpened, setModal] = useState(false)
  const [type, setType] = useState('')
  const [msg, setMsg] = useState('')

  const [name, setName] = useState('')
  const [mail, setMail] = useState('')
  const [comment, setComment] = useState('')
  const supabase = createSupabaseClient();
  function displaModal(){
    setTimeout(()=>{
      setModal(false)
    },4000)
  }
  const submitTrigger= async(e)=>{
    e.preventDefault()
    if(name.length<2||comment.length<3||mail.length<8){
      setType('error')
      setMsg('Your comment, mail or name should not be empty, haba!')
      setModal(true)
      displaModal()
    }else{
      submitForm()
    }
  }

  const submitForm = async(e)=>{
    setCommentLoading(true)
    const { data, error } = await supabase
      .from('Commentsection')
      .insert([
        {
          post_id: id,
          username:name,
          mail:mail,
          payload:comment,
          parent_id:parentId,
          reply_to:replyTo
        },
      ]);
      if(error){
        console.log(error?.message);
      }
      else{
      changeset.setChange(true)
      setCommentLoading(false)
      setType('success')
      setMsg('Comment sent successfully!')
      setModal(true)
      displaModal()
      setName('')
      setMail('')
      setComment('')
      isReply.setReply(false)
    }
  }
  return (
    <div className='comnments'>
      {modalOpened&&<Modal type={type} msg={msg}/>}
        <form onSubmit={submitTrigger}>
            <textarea id='comment' name='comment' rows={10} onChange={(e) => setComment(e.target.value)} value={comment}/>
            <label>Name</label>
            <input type='text' name='name' id='name' onChange={(e) => setName(e.target.value)} value={name}/>
            <label>Mail</label>
            <input type='email' name='mail' id='mail' onChange={(e) => setMail(e.target.value)} value={mail}/>
            <label id='savelabel'><input type='checkbox' name='savename' id='radiobtn' /><span>Save my name and email in this browser for the next time I comment.</span></label>
            {commentLoading?(
              
              <button disabled>Loading...</button>
            ):(
            isReply.reply?(
                          
              <button>{commentLoading?('Loading...'):('Send a Reply!')}</button>
            ):(<button>{commentLoading?('Loading...'):('Send a Comment!')}</button>)

            )}
           
        </form>
    </div>
  )
}

export default Comments

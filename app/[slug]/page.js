'use client'
import React, {createContext, useContext, useEffect, useState } from 'react'
import { BlogContext } from '../wrapper'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Commentsection from '../Components/Comments'
import { commentsContext } from '../wrapper'
import HeadComments from '../Components/HeadComments'
import { ChangeContext } from '../wrapper'
import Modal from '../Components/Modal'
export const ReplyContext = createContext();
function page({params}) {
  const changeset = useContext(ChangeContext)
  const lists = useContext(BlogContext)
  const commentsList = useContext(commentsContext)
  const [Comments, setComments] = useState([])

  const [reply, setReply]=useState(false)
  const[replyTo, setReplyTo] = useState(null)
  const [parentId, setParentId] = useState(null)
  
  const writeComment=(comment)=>{
    setReply(true)
    setReplyTo(comment.username)
    if(comment.parent_id !==null){
      setParentId(comment.parent_id)
    }else{
      setParentId(comment.id)

    }
  }

  

  const [title, setTitle] = useState('')
  const [post, setPost] = useState('')
  const [defined, setDefined] = useState(1)
 useEffect(()=>{
  setTitle(params.slug)
 },[params])

  useEffect(()=>{
   if(title != ''&&lists.length>0){
    const newpost= lists.filter(post=>{return(post.title.split(' ').join('-').toLowerCase()==title.toLowerCase())})
    
    if(newpost.length==0){
      setDefined(0)
    }
    setPost(newpost[0])
   }
  },[lists, title])
  useEffect(()=>{
    setComments(commentsList.filter(comment=>comment.post_id==post.id))
    changeset.setChange(false)
    console.log(Comments)
  },[commentsList, changeset])


  if(post===''){
    return(<div className='loading'>
      <span></span>
      <span></span>
      <p>Loading...</p>

    </div>)
  }
  if(defined==0){
    return(
      notFound()
    )
  }

  //Comment time
  const timeDifference = (commentTime) => {
    const now = new Date();
    const commentDate = new Date(commentTime); 
    const difference = now - commentDate;
    const minutes = Math.floor(difference / (1000 * 60));
  const hours = Math.floor(difference / (1000 * 60 * 60));
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const weeks =Math.floor(difference / (1000 * 60 * 60 * 24*7));
  const months =Math.floor(difference / (1000 * 60 * 60 * 24*7*4));
  const year =Math.floor(difference / (1000 * 60 * 60 * 24*7*4 * 52));

  if (minutes < 60) {
    return `${minutes}min`;
  } else if (hours < 24) {
    return `${hours}hr`;
  } else if(days<7){
    return `${days}d`;
  }else if(weeks<4){
    return `${weeks}w`;
  }else if(months<52){
    return `${months}m`;
  }else{
    return `${year}y`;
  }
  };


  return (
    <div className='post-page container'>
    <div className='post wrap'>
      <div className='wrap heading'>
      <h5 className='category'>
        {post.category}
      </h5>
      <h2 className='title'>{post.title}</h2>
      <div className='date-comments'>
      <p>{new Date(post.created_at).toISOString().split('T')[0]}</p>
        <span></span>
        <p><Link href={`/${title}/#comments`}  scroll={true}>{Comments.filter(comment=>{return comment.post_id==post.id}).length>0?(`${Comments.filter(comment=>{return comment.post_id==post.id}).length} comments`):('No comments')} </Link></p>
      </div>    
      </div>
      <div>
      <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
        <p className='content'>
          {post.content} 
          </p> 
      </pre>
        </div>
       
    </div>
 
    <div id='comments' className='comment-section'>
    <div className='comments-view'>
        {Comments?.filter(comment=>comment.post_id==post.id).map(comment=>{
          return(
            <div key={comment.id}>
              {comment.parent_id===null&&
              <div className='comments-sect'>
                <div className='headcomments'>
                  <div className='initial'>
                    {comment.username.slice(0,1)}
                  </div>
                <div>
                  <h3>{comment.username}</h3>
                    <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                    <p>{comment.payload}</p>
                    </pre>
                    <div className='reply-date'>
                      <p>{timeDifference(comment.created_at)}</p>
                      <p onClick={()=>writeComment(comment)}>Reply</p>
                    </div>
                    </div>
                  </div>
                  {Comments.filter(childcomment=>childcomment.parent_id==comment.id).map(childcomment=>{
                    return(
                      <div className='childComment'> <div className='initial'>
                      {childcomment.username.slice(0,1)}
                    </div>
                  <div>
                    <p className='reply_to'>Reply to {childcomment.reply_to}</p>
                    <h3>{childcomment.username}</h3>
                      <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                      <p>{childcomment.payload}</p>
                      </pre>
                      <div className='reply-date'>
                        <p>{timeDifference(comment.created_at)}</p>
                        <p onClick={()=>writeComment(childcomment)}>Reply</p>
                      </div>
                      </div>
                    </div>
                    )
                  })}
              </div>
              }
              
            </div>
          )
        })}
       </div>
       <ReplyContext.Provider value={{reply, setReply}}>
       {reply?(
        <div className='commentSection replying'>
        <div className='section_head'><h4>Reply to {replyTo.slice(0,8)}..</h4>
        <button onClick={()=>{setReply(false)}}>Cancel</button>
        </div>
        <Commentsection id={post.id} replyTo={replyTo} parentId={parentId}/>
         </div>
       ):(<div className='commentSection'>
      <h4>Enjoyed this? Drop a comment!</h4>
      <Commentsection id={post.id} replyTo={null} parentId={null}/>
       </div>)}
       </ReplyContext.Provider>
      
       
    </div>

    </div>
   
  )
}

export default page

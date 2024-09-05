'use client'
import React, { useContext, useEffect, useState } from 'react'
import { BlogContext } from '../wrapper'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Commentsection from '../Components/Comments'
import { commentsContext } from '../wrapper'
import HeadComments from '../Components/HeadComments'
import { ChangeContext } from '../wrapper'
import Modal from '../Components/Modal'
function page({params}) {
  const changeset = useContext(ChangeContext)
  const lists = useContext(BlogContext)
  const commentsList = useContext(commentsContext)
  const [Comments, setComments] = useState(commentsList)
  
  useEffect(()=>{
    setComments(commentsList)
    console.log(commentsList)
    changeset.setChange(false)
  },[commentsList, changeset])

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
            {<HeadComments payload={comment.payload} username={comment.username}/>}
            </div>
          )
        })}
       </div>
      <Commentsection id={post.id}/>
    </div>

    </div>
   
  )
}

export default page

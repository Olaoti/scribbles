'use client'
import React, { useContext, useEffect, useState } from 'react'
import { BlogContext } from '../wrapper'
import Link from 'next/link'


function page({params}) {
  const [title, setTitle] = useState('')
  const [post, setPost] = useState('')
  const lists = useContext(BlogContext)
 useEffect(()=>{
  setTitle(params.slug)
 },[params])

  useEffect(()=>{
   if(title != ''){
    const newpost= lists.filter(post=>{return(post.title.split(' ').join('-')==title)})
    setPost(newpost[0])
   }
  },[title])
  if(post===''){
    return(<div>Loading...</div>)
  }
  return (
    <div className='post-page'>
    <div className='post wrap'>
      <div className='wrap heading'>
      <h5 className='category'>
        {post.category}
      </h5>
      <h2 className='title'>{post.title}</h2>
      <div className='date-comments'>
        <p>{post.date}</p>
        <span></span>
        <p><Link href={`/${title}/#comments`}  scroll={true}>{post.comments.length>0?(`${post.comments.length}comments`):('No comments')} </Link></p>
      </div>    
      </div>
      <div>
          <p className='content'>
          {post.content} 
          </p> 
        </div>
    </div>
    <div id='comments'>
      <p>Enter your comments</p>
    </div>
    </div>
   
  )
}

export default page

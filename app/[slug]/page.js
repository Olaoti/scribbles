'use client'
import React, { useContext, useEffect, useState } from 'react'
import { BlogContext } from '../wrapper'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Comments from '../Components/Comments'


function page({params}) {
  const [title, setTitle] = useState('')
  const [post, setPost] = useState('')
  const [defined, setDefined] = useState(1)
  const lists = useContext(BlogContext)
 useEffect(()=>{
  setTitle(params.slug)
 },[params])

  useEffect(()=>{
   if(title != ''){
    const newpost= lists.filter(post=>{return(post.title.split(' ').join('-')==title)})
    if(newpost.length==0){
      setDefined(0)
    }
    setPost(newpost[0])
   }
  },[title])
  if(post===''){
    return(<div className='loading'>
      <span></span>
      <span></span>
      <p>Loading....</p>

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
    <div id='comments' className='comment-section'>
      <p>Enter your comments</p>
      <Comments/>
    </div>

    </div>
   
  )
}

export default page

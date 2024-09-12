'use client'
import React, { useContext, useEffect, useState } from 'react'
import { BlogContext } from '../layout'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Comments from '../Components/Comments'
import { createSupabaseClient } from '@/utils/supabase/client'

function page({params}) {
  const [title, setTitle] = useState('')
  const [post, setPost] = useState('')
  const [defined, setDefined] = useState(1)
  const [lists, setists] = useState([])
  const posts = useContext(BlogContext)
  const supabase = createSupabaseClient();
  useEffect(()=>{
    getContents()
  },[])
  async function getContents(){
    try {
      const {data, error} = await supabase 
      .from("Contents")
      .select("*")
      .limit(10)
      if(error) throw error;
      if(data!=null){
        setists(data);
        posts.setLists(data);
      }
    } catch (error) {
      alert(error.message)
    }
  }
 useEffect(()=>{
  setTitle(params.slug)
 },[params])

  useEffect(()=>{
   if(title != ''){
    let newpost;
    console.log(posts.lists)
    console.log(lists)

    if(posts.lists.length>0){
      newpost= posts.lists.filter(post=>{return(post.title.split(' ').join('-')==title)})
    }else{
      newpost= lists.filter(post=>{return(post.title.split(' ').join('-')==title)})
    }
      
    
    if(newpost.length==0){
      setDefined(0)
    }
    setPost(newpost[0])
   }
  },[lists])
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
        <p>{post.date}</p>
        <span></span>
        <p><Link href={`/${title}/#comments`}  scroll={true}> </Link></p>
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
      <Comments/>
    </div>

    </div>
   
  )
}

export default page

'use client'
import React, { useContext, useState } from 'react'
import { BlogContext } from '../layout'
import Link from 'next/link'

function Preview() {
  const Lists = useContext(BlogContext)
  const truncate = function(text, catey){
    var num = 0;
    if (catey == 'Poem'){
      num=100
    }else if(catey=='art'){
      num=400
    }else{
      num=1200
    }
    return (text.length > num) ?
    text.slice(0, num - 1) + '…' : text;
  }

  const readingTime = function(text) {
    const wpm = 225;
    const words = text.trim().split(/\s+/).length;
    const time = Math.ceil(words / wpm);
    return time
  }
  
  const [lists, setLists]=useState(Lists)
  return ( 
    <div>
        {Lists?.map(list=>{
            return(
                <div className='post-card wrap center' key={list.id}>
                    <div className='wrap heading'>
                      <h5 className='category'>
                        {list.category}
                      </h5>
                      <h2 className='title'>
                      <Link href={`/${list.title.split(' ').join('-')}`}>{list.title}</Link></h2>
                      <div className='date-comments'>
                        <p>{list.date}</p>
                        <span></span>
                        
                        <p><Link href={`/${list.title.split(' ').join('-')}/#comments`}>{list.comments.length>0?(`${list.comments.length}comments`):('No comments')} </Link></p>
                      </div>
                      </div>
                      <div>
                        <p className='content'>
                        {
                        truncate(list.content,list.category)
                         } 
                        </p> 
                      </div>
                      <div className='post-info'>
                        <div className='read-time info'>Reading Time: {readingTime(list.content)} min
                        </div>
                        <div className='show-more'><Link href={`/${list.title.split(' ').join('-')}`}>Continue Reading</Link></div>
                        <div className='info post_author'>Written BY: Omotola</div>

                      </div>
                     
                </div>
            )
        })}
    </div>
  )
}

export default Preview

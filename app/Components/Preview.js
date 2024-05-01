'use client'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { BlogContext } from '../wrapper'
import Link from 'next/link'
import { RoundButton } from './buttons'
import { SearchContect } from '../wrapper'
export const DisplayContext = createContext()
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
  const [lists, setLists]=useState()

  const [displaying, setDisplaying] = useState('')
  const handlefilter = (e) => {
    setDisplaying(e.target.id);
  };
  const changeCategory=(e)=>{
    setDisplaying(e)
  }
  useEffect(()=>{
    setLists(Lists?.filter(list=>{
      return list.category.includes(displaying)&&list.hide==false
    }))
  }, [displaying])
  const [search, setSearch] = useContext(SearchContect)
  useEffect(()=>{
    setLists(Lists?.filter(list=>{
      return (list.title.includes(search)||list.content.includes(search))&&list.hide==false
    }))
  },[search])
  return ( 
    <div className='container'>
        <div className='category-select' onClick={handlefilter}>
          <DisplayContext.Provider value={displaying}>
          <RoundButton id={''} text={'All'}/>
          <RoundButton id={'poem'} text={'Poem'}/>
          <RoundButton id={'story'} text={'Story'}/>
          <RoundButton id={'art'} text={'Art'}/>
          <RoundButton id={'scribble'}text={'Uncategorized'}/>
          </DisplayContext.Provider>
        </div>
        {lists?.map(list=>{
            return(
                <div className='post-card wrap center' key={list.id}>
                    <div className='wrap heading'>
                      <h5 className='category' onClick={()=>changeCategory(list.category)}>
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
                      </div>
                     
                </div>
            )
        })}
    </div>
  )
}

export default Preview

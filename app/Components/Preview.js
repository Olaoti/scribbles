'use client'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { BlogContext } from '../wrapper'
import Link from 'next/link'
import { RoundButton } from './buttons'
import { useRouter, useSearchParams } from 'next/navigation';
import { commentsContext } from '../wrapper'

export const DisplayContext = createContext()

function Preview() {
  const comments = useContext(commentsContext)
  const Lists = useContext(BlogContext)
  const truncate = function(text, catey){
    var num = 0;
    if (catey == 'poem'){
      num=320
    }else{
      num=700
    }
    return (text.length > num) ?
    text.slice(0, num - 1) + '…' : text;
  }
  const formatRandomDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };


  const readingTime = function(text) {
    const wpm = 225;
    const words = text.trim().split(/\s+/).length;
    const time = Math.ceil(words / wpm);
    return time
  }
  const [lists, setLists]=useState()
  const[loading, setLoading] = useState(true)
 
  const [displaying, setDisplaying] = useState('')
  const handlefilter = (e) => {
    setDisplaying(e.target.id);
    const params = new URLSearchParams(searchParams);
    params.delete('s');
    replace(`/?${params.toString()}`)
  };
  const changeCategory=(e)=>{
    setDisplaying(e)
    const params = new URLSearchParams(searchParams);
    params.delete('s');
    replace(`/?${params.toString()}`)
  }
  const { replace } = useRouter();
  useEffect(()=>{
    if(Lists.length>0){
      setLists(Lists?.filter(list=>{
        return list.category.includes(displaying)&&list.hide==false
      }))
      setLoading(false)
    }else{
      setLoading(true)
    }
  },[Lists, displaying])


 //search functionality
 const [search, setSearch] = useState('')
 const searchParams = useSearchParams()
  const consumeSearchParams = (e)=>{
   const params = new URLSearchParams(searchParams);
   const newparam= params.get('s')
   if(newparam){
    setSearch(newparam.toLowerCase())
   }else{
    setSearch('')
   }
  }
  useEffect(()=>{
   consumeSearchParams()
  })
  
 useEffect(()=>{
   setLists(Lists?.filter(list=>{
     return ((list.title).toLowerCase().includes(search)||list.content.toLowerCase().includes(search))&&list.hide==false
   }))
 },[search])
 if(loading){
   return(
    <div className='container loading-spin'>
      <div className='spinner'></div>
    </div>
   )
 }
  return ( 
    <div className='container'>
        <div className='category-select' onClick={handlefilter}>
          <DisplayContext.Provider value={displaying}>
          <RoundButton id={''} text={'All'}/>
          <RoundButton id={'poem'} text={'Poem'}/>
          <RoundButton id={'story'} text={'Story'}/>
          <RoundButton id={'tech'} text={'Tech'}/>
          <RoundButton id={'uncategorized'}text={'Uncategorized'}/>
          </DisplayContext.Provider>
        </div>
        {lists?.length==0&&(
            <div className='wrap no-list'><p>
                Empty list ! Your searchword is not here!
              </p>
            </div>
        )}
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
                      <p className='date'>{formatRandomDate(list.created_at)}</p>
                        <p></p>
                        <span></span>
                        {<p><Link href={`/${list.title.split(' ').join('-')}/#comments`}>{comments.filter(comment=>{return comment.post_id==list.id}).length>0?(`${comments.filter(comment=>{return comment.post_id==list.id}).length} comments`):('No comments')} </Link></p>}
                      </div>
                      </div>
                      <div>
                      <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                        <p className='content'>
                        {
                        truncate(list.content,list.category)
                         } 
                          </p> 
                        </pre>
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

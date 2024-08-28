'use client'
import { createContext, useState, useEffect } from 'react'
import Lists from './Lists'
import Navbar from './Components/Navbar'
import { createSupabaseClient } from '../utils/supabase/client'

export const BlogContext = createContext()
export const SearchContect = createContext()

export default function Wrapper({ children }) {
const supabase = createSupabaseClient();
const [search, setSearch] = useState('')
const [lists, setLists] = useState([])
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
        setLists(data);
      }
    } catch (error) {
      alert(error.message)
    }
  }
console.log(lists)
  return (
    <BlogContext.Provider value={lists}>
      <SearchContect.Provider value={[search, setSearch]}>
            <Navbar/>
            {children}
        </SearchContect.Provider>
      </BlogContext.Provider>
    )
}
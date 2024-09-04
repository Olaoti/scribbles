'use client'
import Navbar from './Components/Navbar'
import { createContext , useState, useEffect} from 'react'
import { createSupabaseClient } from '../utils/supabase/client'

export const BlogContext = createContext({
  lists: []
});
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
      .order('created_at', { ascending: false })
      if(error) throw error;
      if(data!=null){
        setLists(data);
        console.log(data)
      }
    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    <BlogContext.Provider value={lists}>
      <SearchContect.Provider value={[search, setSearch]}>
    <Navbar/>

    {children}

      </SearchContect.Provider>
    </BlogContext.Provider>

    )
}
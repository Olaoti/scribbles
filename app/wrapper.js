'use client'
import Navbar from './Components/Navbar'
import { createContext , useState, useEffect} from 'react'
import { createSupabaseClient } from '../utils/supabase/client'

export const BlogContext = createContext({
  lists: []
});

export const commentsContext = createContext();
export const ChangeContext = createContext({
  change: false, setChange:null
});
export default function Wrapper({ children }) {

  const supabase = createSupabaseClient();
const [comments, setComments] = useState([])
const [lists, setLists] = useState([])
const [change, setChange] = useState(false)
  useEffect(()=>{
    getContents(),
    getComments()
  },[])
  useEffect(()=>{
    getComments()
  },[change])
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
      }
    } catch (error) {
      console.log(error.message)
    }
  }
  async function getComments(){
    try {
      const {data, error} = await supabase 
      .from("Commentsection")
      .select("*")
      .limit(1000)
      .order('created_at', { ascending: true })
      if(error) throw error;
      if(data!=null){
        setComments(data);
      }
    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    <BlogContext.Provider value={lists}>
      <commentsContext.Provider value={comments}>
        <ChangeContext.Provider value={{change, setChange}}>
    <Navbar/>

    {children}
    </ChangeContext.Provider>
      </commentsContext.Provider>
    </BlogContext.Provider>

    )
}
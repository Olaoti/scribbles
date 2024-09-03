"use client"
import './globals.scss'
import { Inter } from 'next/font/google'
import Wrapper from './wrapper'
import { createContext , useState, useEffect} from 'react'

import { createSupabaseClient } from '../utils/supabase/client'

export const BlogContext = createContext({
  lists: []
});
export const SearchContect = createContext()

const inter = Inter({ subsets: ['latin']})

export const metadata = {
  title: "Omotola's scribbles",
  description: 'Nothinig serious, just a place i dump my writeups',
}

export default function RootLayout({ children }) {

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
      console.log(error.message)
    }
  }
  return (
    <BlogContext.Provider value={lists}>
      <SearchContect.Provider value={[search, setSearch]}>
      <html lang="en" style={{ scrollBehavior: "smooth" }}>
        <body className={inter.className}>

            <Wrapper>
              {children}
            </Wrapper>
          </body>
      </html>
      </SearchContect.Provider>
    </BlogContext.Provider>
  )
}
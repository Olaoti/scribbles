'use client'

import { createContext, useState } from 'react'
import Lists from './Lists'
import Navbar from './Components/Navbar'

export const BlogContext = createContext()
export const SearchContect = createContext()

export default function Wrapper({ children }) {
const [search, setSearch] = useState('')

  return (
    <BlogContext.Provider value={Lists}>
      <SearchContect.Provider value={[search, setSearch]}>
            <Navbar/>
            {children}
        </SearchContect.Provider>
      </BlogContext.Provider>
    )
}
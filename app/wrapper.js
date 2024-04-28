'use client'

import { createContext } from 'react'
import Lists from './Lists'


export const BlogContext = createContext()

export default function Wrapper({ children }) {
  return (
    <BlogContext.Provider value={Lists}>
        <div className='container'>
          {children}
        </div>
      </BlogContext.Provider>
    )
}
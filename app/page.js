'use client'
export const ListsContext = createContext([])
import Preview from './Components/Preview'

import { createContext, useEffect, useState } from "react"


function Home() {
  
  return (
    <div className="homepage">
        <Preview/>
      </div>
  )
}
export default Home

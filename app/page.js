'use client'
export const ListsContext = createContext([])
import Preview from './Components/Preview'

import { createContext } from "react"
import Lists from "./Lists"

function Home() {
  return (
    <div className="homepage">
      <ListsContext.Provider value={Lists}>
        <Preview/>
      </ListsContext.Provider>
      </div>
  )
}
export default Home

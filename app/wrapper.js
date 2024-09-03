'use client'
import Navbar from './Components/Navbar'

export default function Wrapper({ children }) {

  
  return (
    <>
    <Navbar/>
    {children}
    </>
    )
}
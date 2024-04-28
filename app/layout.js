'use client'
import { createContext } from 'react'
import './globals.scss'
import { Inter } from 'next/font/google'
import Lists from './Lists'

const inter = Inter({ subsets: ['latin']})

export const metadata = {
  title: "Omotola's scribbles",
  description: 'Nothinig serious, just a place i dump my writeups',
}

export const BlogContext = createContext()

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={inter.className}>
      <BlogContext.Provider value={Lists}>
        <div className='container'>
          {children}
        </div>
      </BlogContext.Provider>
        </body>
    </html>
  )
}
import './globals.scss'
import { Inter } from 'next/font/google'
import Wrapper from './wrapper'

const inter = Inter({ subsets: ['latin']})

export const metadata = {
  title: "Omotola's scribbles",
  description: 'Nothing serious, just a place i dump my writeups',
}

export default function RootLayout({ children }) {

  
  return (
    
      <html lang="en" style={{ scrollBehavior: "smooth" }}>
        <body className={inter.className}>

            <Wrapper>
              {children}
            </Wrapper>
          </body>
      </html>
  )
}
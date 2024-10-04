'use client'
import React, { useState } from 'react'
import SearchIcon from "../../public/assets/search.svg"
import {  useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
function Navbar() {
  const path= usePathname()
  const [inputValue, setInputValue] = useState(''); 
  const handleSearch=(e)=>{
    setInputValue(e.target.value);
  }
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const sendSearchParam = (e)=>{
    const params = new URLSearchParams(searchParams);
    if(e.which==13){
      if (inputValue) {
        params.set('s', inputValue);
      } else {
        params.delete('s');
      }
    replace(`/?${params.toString()}`);
    setInputValue('')
    }
  }

 
  return (
    <div className='navbar'>
      <Link href='/'>
      <div className='logo'>Scree<span>bles</span></div>
      </Link>
      <div className='search'><SearchIcon style={{fill:'white'}} />
      <input id='search' placeholder='Search and click enter' value={inputValue} onChange={handleSearch} onKeyUp={sendSearchParam}/>
      </div>
      <Link href='/about-me' className={path==='/about-me'&&'active'}>
      <div className='about-me'>About me</div>
      </Link>
    
    </div>
  )
}

export default Navbar

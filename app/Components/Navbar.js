'use client'
import React, { useContext, useEffect, useState } from 'react'
import SearchIcon from "../../public/assets/search.svg"
import {  useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
function Navbar() {
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
      <div className='logo'>Screebles</div>
      </Link>
      <div className='search'><SearchIcon style={{fill:'white'}} />
      <input id='search' placeholder='Search and click enter' value={inputValue} onChange={handleSearch} onKeyUp={sendSearchParam}/>
      </div>
      <Link href='/about-me'>
      <div>About me</div>
      </Link>
    
    </div>
  )
}

export default Navbar

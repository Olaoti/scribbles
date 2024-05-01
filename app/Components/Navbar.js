import React, { useContext, useState } from 'react'
import { SearchContect } from '../wrapper'
function Navbar() {
  const [search, setSearch] = useContext(SearchContect)
  const [inputValue, setInputValue] = useState(''); 
  const handleSearch=(e)=>{
    setInputValue(e.target.value);
    setSearch(e.target.value)
  }
  return (
    <div className='navbar'>
      <div className='logo'>Screeble</div>
      <div><input id='search' placeholder='Search through' value={inputValue} onChange={handleSearch}/></div>
      <div>About me</div>
    </div>
  )
}

export default Navbar

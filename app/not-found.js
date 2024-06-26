"use client";
import Link from 'next/link';
import React from 'react'

function notFound() {
  return (
    <div className='not-found'>
        <h1>Oops!</h1>
        <h5>This page does not exist</h5>
      <p>Trust me already? Even when we are both lost in reading, I would find your path back home!</p>
      <Link href='/'>
      <button>GO HOME</button>
      </Link>
    </div>
  )
}

export default notFound

import React from 'react'

export default function Modal({msg, type}) {
  return (
    <div className={`modal ${type}`}>
      <h3>{type}!</h3>
      <p>{msg}</p>
    </div>
  )
}

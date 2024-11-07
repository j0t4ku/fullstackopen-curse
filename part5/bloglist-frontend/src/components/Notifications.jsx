import React from 'react'

export default function Notifications({ message }) {
  if (message === null) return null
  if (message.includes('error')) {
    return <div className='error'>{message.substring(5)}</div>
  }
  return <div className='success' >{message}</div>
}

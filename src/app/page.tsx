'use client'

import './globals.css'

export default function Home() {
  return (
    <>
      <p className='p-6 text-center text-4xl'>
        Go to
        <a href="./toeic" className='hover:text-blue-600 text-green-600 underline'> TOEIC Scoring App</a>
      </p>
      <p className='p-6 text-center text-4xl'>
        Go to
        <a href="./todo" className='hover:text-blue-600 text-green-600 underline'> ToDo App</a>
      </p>
    </>
  )
}

'use client'

import React from 'react'

function page({params}:any) {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>profile page</h1>
      <h2 className='p-3 bg-violet-700 rounded text-black'>{params.id}</h2>
    </div>
  )
}

export default page

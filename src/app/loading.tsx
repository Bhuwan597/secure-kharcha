import { Loader2 } from 'lucide-react'
import React from 'react'

const Loading = () => {
  return (
    <div className='min-h-screen flex flex-col justify-center items-center text-secondary-color'>
        <Loader2 size={40} className='animate-spin' />
    </div>
  )
}

export default Loading
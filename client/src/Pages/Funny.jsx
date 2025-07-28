import React from 'react'
import { funnyQuotes } from '../data/data'
import QuoteRender from '../Components/QuoteRender'

function Funny() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-lime-50'>
      <QuoteRender quotes={funnyQuotes} />
    </div>
  )
}

export default Funny

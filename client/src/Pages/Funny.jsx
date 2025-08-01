import React from 'react'
import { funnyQuotes } from '../data/data'
import QuoteRender from '../Components/QuoteRender'

function Funny() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-lime-100 to-lime-200'>
      <QuoteRender quotes={funnyQuotes} />
    </div>
  )
}

export default Funny

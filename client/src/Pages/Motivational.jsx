import React from 'react'
import QuoteRender from '../Components/QuoteRender'
import { motivationalQuotes } from '../data/data'
function Motivational() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-lime-100 to-lime-200'>
      <QuoteRender quotes={motivationalQuotes} />
    </div>
  )
}

export default Motivational

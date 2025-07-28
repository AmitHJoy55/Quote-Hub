import React from 'react'
import QuoteRender from '../Components/QuoteRender'
import { motivationalQuotes } from '../data/data'
function Motivational() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-lime-50'>
      <QuoteRender quotes={motivationalQuotes} />
    </div>
  )
}

export default Motivational

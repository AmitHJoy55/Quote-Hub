import React from 'react'
import QuoteRender from '../Components/QuoteRender'
import { romanticQuotes } from '../data/data'
function Romantic() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-lime-50'>
      <QuoteRender quotes={romanticQuotes} />
    </div>
  )
}

export default Romantic

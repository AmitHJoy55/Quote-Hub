import React from 'react'
import QuoteRender from '../Components/QuoteRender'
import { romanticQuotes } from '../data/data'
function Romantic() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-lime-100 to-lime-200'>
      <QuoteRender quotes={romanticQuotes} />
    </div>
  )
}

export default Romantic

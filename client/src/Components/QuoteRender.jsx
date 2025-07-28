import React from 'react'

function QuoteRender({ quotes}) {
return (
    <div className="flex flex-col items-center">
        {quotes.map((quoteObj, idx) => (
            <div
                key={idx}
                className="max-w-xl mx-auto p-8 bg-white rounded-xl shadow-lg relative my-6 w-full"
            >
                <p className="text-2xl font-mono mb-10 leading-snug">
                    “{quoteObj.quote}”
                </p>
                <span className="absolute right-8 bottom-6 italic font-medium text-gray-600">
                    {quoteObj.author && `— ${quoteObj.author}`}
                </span>
            </div>
        ))}
    </div>
)
}

export default QuoteRender

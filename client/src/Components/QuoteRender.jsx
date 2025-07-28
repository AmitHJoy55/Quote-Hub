import React from 'react'

function QuoteRender({ quotes}) {
return (
    <div className="flex flex-col items-center">
        {quotes.map((quote, idx) => (
            <div
                key={idx}
                className="my-6 p-6 rounded-xl bg-gray-50 shadow-md border-l-4 border-indigo-500 max-w-xl w-full"
            >
                <p className="text-lg italic text-gray-800 mb-3">
                    “{quote.text}”
                </p>
                <div className="text-right text-indigo-600 font-semibold text-base">
                    — {quote.author}
                </div>
            </div>
        ))}
    </div>
)
}

export default QuoteRender

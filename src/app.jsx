import ReactDOM from 'react-dom/client'
import React, { useState } from 'react'
import './styles.css'

const root = ReactDOM.createRoot(document.getElementById('word-search'))

const App = () => {
  const [results, setResults] = useState([])
  const [searchText, setSearchText] = useState('')
  const [searchHistory, setSearchHistory] = useState([])
  const [searchParameter, setSearchParameter] = useState('rel_syn')

  const fetchResults = async () => {
    const url = new URL('words', 'https://api.datamuse.com/')
    url.searchParams.set(searchParameter, searchText)
    return fetch(url).then((response) => response.json())
  }
  const generateResults = () => {
    if (searchText === '') return
    fetchResults(searchText).then((results) => setResults(results))
    setSearchText('')
    setSearchHistory([...searchHistory, searchText])
    document.querySelector('#searchParameter').focus()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    generateResults()
  }

  return (
    <>
      <form onSubmit={handleSubmit} className='text-3xl flex flex-wrap gap-5'>
        <input
          className='border-2 border-red-950 p-5 rounded-sm drop-shadow-md flex-grow'
          type='text'
          id='searchParameter'
          value={searchText}
          onChange={(event) => {
            setSearchText(event.target.value)
          }}
        />
        <button id='searchButton' className='flex-grow cursor-pointer border-2 border-red-950 p-5 rounded-sm drop-shadow-md'>
          SEARCH
        </button>
      </form>
      <section className='mt-4'>
        <div className='flex flex-wrap gap-1 text-3xl'>
          {results.map((result) => {
            return (
              <button
                className='cursor-pointer flex-grow border border-gray-500 p-1'
                key={result.word}
                onClick={() => {
                  setSearchText(result.word)
                  document.querySelector('#searchButton').focus()
                }}
              >
                {result.word}
              </button>
            )
          })}
        </div>
      </section>
    </>
  )
}

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

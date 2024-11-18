// Import React and Redux hooks
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { searchCharacters } from './store/marvelSlice'
import './App.css'

// console.log('App.jsx is loading')

/**
 * Main App component that handles the Marvel character search
 * This is where we connect our Redux store to our React components
 */
function App() {
  // Local state for the search input
  const [searchTerm, setSearchTerm] = useState('')
  // console.log('Search term state created')
  
  // Get dispatch function to send actions to Redux
  const dispatch = useDispatch()
  // console.log('Got dispatch function')

  // Get our character data from the Redux store
  // This is like checking our pizza delivery status
  const { characters, status, error } = useSelector((state) => state.marvel)
  // console.log('Current characters:', characters)
  // console.log('Loading status:', status)
  
  /**
   * Handle the search form submission
   * This is where we tell Redux to fetch our Marvel characters
   */
  const handleSearch = (e) => {
    e.preventDefault() // Stop the form from refreshing the page
    // console.log('Form submitted')
    // console.log('Search term:', searchTerm)
    
    if (searchTerm.trim()) {
      // console.log('Dispatching search action') // Is Redux working?
      dispatch(searchCharacters(searchTerm))
    }
  }

  return (
    <>
      {/* Animated background shapes */}
      <div className="background-shapes">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="shape" />
        ))}
      </div>

      <div className="container">
        <h1>Marvel Character Search</h1>
        
        {/* Search form */}
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Marvel characters..."
            className="search-input"
          />
          <button type="submit" className="search-button">Search</button>
        </form>

        {/* Loading and error states */}
        {status === 'loading' && <div>Loading...</div>}
        {error && <div className="error">Error: {error}</div>}
        
        {/* Display our Marvel characters in a grid */}
        <div className="characters-grid">
          {characters.map(character => (
            // console.log('Rendering character:', character.name)
            <div key={character.id} className="character-card">
              <img 
                src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                alt={character.name}
                className="character-image"
              />
              <h3>{character.name}</h3>
              {character.description && <p>{character.description}</p>}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

// console.log('App component defined') // More debugging breadcrumbs
// console.log('Ready to export App') // Almost there...

export default App

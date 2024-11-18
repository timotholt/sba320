// Import React and Redux hooks
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { searchCharacters } from './store/marvelSlice'
import MarvelBackground from './components/MarvelBackground'
import SearchForm from './components/SearchForm'
import CharacterGrid from './components/CharacterGrid'
import LoadingSpinner from './components/LoadingSpinner'
import ErrorMessage from './components/ErrorMessage'
import './App.css'

function App() {
  // Local state for the search input
  const [searchTerm, setSearchTerm] = useState('')
  
  // Get dispatch function to send actions to Redux
  const dispatch = useDispatch()

  // Get our character data from the Redux store
  const { characters, status, error } = useSelector((state) => state.marvel)
  
  /**
   * Handle the search form submission
   * This is where we tell Redux to fetch our Marvel characters
   */
  const handleSearch = (e) => {
    e.preventDefault() // Stop the form from refreshing the page
    
    if (searchTerm.trim()) {
      dispatch(searchCharacters(searchTerm))
    }
  }

  return (
    <>
      <MarvelBackground />
      
      <div className="container">
        <h1>Marvel Character Search</h1>
        <SearchForm 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
          handleSearch={handleSearch} 
        />
        
        {/* Loading State */}
        {status === 'loading' && <LoadingSpinner />}

        {/* Error State */}
        {error && <ErrorMessage error={error} />}
        
        {/* Display our Marvel characters */}
        {characters.length > 0 && <CharacterGrid characters={characters} />}
      </div>
    </>
  )
}

export default App

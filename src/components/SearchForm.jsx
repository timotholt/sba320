import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { searchCharacters } from '../store/marvelSlice'

const SearchForm = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const dispatch = useDispatch()

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      dispatch(searchCharacters(searchTerm))
    }
  }

  return (
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
  )
}

export default SearchForm

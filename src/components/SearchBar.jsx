import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchTerm, selectSearchTerm } from '../redux/slices/filtersSlice'
import { useDebounce } from '../utils/debounce'
import './SearchBar.css'

// Search bar component with debounced input
const SearchBar = () => {
  const dispatch = useDispatch()
  const currentSearchTerm = useSelector(selectSearchTerm)
  const [localSearch, setLocalSearch] = useState(currentSearchTerm)
  
  // Debounce the search term to avoid too many updates
  const debouncedSearch = useDebounce(localSearch, 300)
  
  // Update Redux store when debounced value changes
  useEffect(() => {
    dispatch(setSearchTerm(debouncedSearch))
  }, [debouncedSearch, dispatch])
  
  const handleSearchChange = (e) => {
    setLocalSearch(e.target.value)
  }
  
  const handleClear = () => {
    setLocalSearch('')
    dispatch(setSearchTerm(''))
  }
  
  return (
    <div className="search-bar">
      <div className="search-input-wrapper">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search products..."
          value={localSearch}
          onChange={handleSearchChange}
          className="search-input"
          aria-label="Search products"
        />
        {localSearch && (
          <button
            onClick={handleClear}
            className="clear-button"
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  )
}

export default SearchBar
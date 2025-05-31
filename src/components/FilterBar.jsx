import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCategory, setSortBy, selectCategory, selectSortBy } from '../redux/slices/filtersSlice'
import { selectCategories } from '../redux/slices/productsSlice'
import './FilterBar.css'

// Filter bar component for category and price sorting
const FilterBar = () => {
  const dispatch = useDispatch()
  const categories = useSelector(selectCategories)
  const selectedCategory = useSelector(selectCategory)
  const sortBy = useSelector(selectSortBy)
  
  const handleCategoryChange = (e) => {
    dispatch(setCategory(e.target.value))
  }
  
  const handleSortChange = (e) => {
    dispatch(setSortBy(e.target.value))
  }
  
  return (
    <div className="filter-bar">
      <div className="filter-group">
        <label htmlFor="category-filter" className="filter-label">
          Category:
        </label>
        <select
          id="category-filter"
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="filter-select"
        >
          <option value="all">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>
              {/* Capitalize first letter for display */}
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>
      
      <div className="filter-group">
        <label htmlFor="sort-filter" className="filter-label">
          Sort by:
        </label>
        <select
          id="sort-filter"
          value={sortBy}
          onChange={handleSortChange}
          className="filter-select"
        >
          <option value="default">Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>
    </div>
  )
}

export default FilterBar
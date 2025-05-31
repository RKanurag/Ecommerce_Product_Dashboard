import { createSelector } from '@reduxjs/toolkit'
import { selectAllProducts } from '../slices/productsSlice'
import { selectSearchTerm, selectCategory, selectSortBy } from '../slices/filtersSlice'
import { selectFavoriteIds } from '../slices/favoritesSlice'

// Memoized selector for filtered and sorted products
// This is where the magic happens - combining all our filters efficiently
export const selectFilteredProducts = createSelector(
  [selectAllProducts, selectSearchTerm, selectCategory, selectSortBy],
  (products, searchTerm, category, sortBy) => {
    let filtered = [...products]
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchTerm)
      )
    }
    
    // Apply category filter
    if (category !== 'all') {
      filtered = filtered.filter(product =>
        product.category === category
      )
    }
    
    // Apply sorting
    switch (sortBy) {
      case 'price-asc':
        // Sorting low to high
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        // Sorting high to low
        filtered.sort((a, b) => b.price - a.price)
        break
      default:
        // Keep original order (by ID)
        break
    }
    
    return filtered
  }
)

// Get favorite products with full details
export const selectFavoriteProducts = createSelector(
  [selectAllProducts, selectFavoriteIds],
  (products, favoriteIds) => {
    // Return full product objects for favorited items
    return products.filter(product => favoriteIds.includes(product.id))
  }
)

// Get count of filtered results (useful for showing "X results found")
export const selectFilteredCount = createSelector(
  [selectFilteredProducts],
  (filtered) => filtered.length
)
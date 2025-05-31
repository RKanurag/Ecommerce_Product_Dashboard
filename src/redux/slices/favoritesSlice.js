import { createSlice } from '@reduxjs/toolkit'

// Managing user's favorite products
// Storing just the product IDs to keep state minimal
const initialState = {
  items: [], // Array of product IDs
}

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    // Toggle favorite status - if it's favorited, remove it; if not, add it
    toggleFavorite: (state, action) => {
      const productId = action.payload
      const index = state.items.indexOf(productId)
      
      if (index !== -1) {
        // Already favorited, so remove it
        state.items.splice(index, 1)
      } else {
        // Not favorited yet, add it
        state.items.push(productId)
      }
    },
    // Remove from favorites (explicit action for favorites page)
    removeFavorite: (state, action) => {
      state.items = state.items.filter(id => id !== action.payload)
    },
    // Clear all favorites (maybe for a "clear all" button in the future)
    clearFavorites: (state) => {
      state.items = []
    },
  },
})

export const { toggleFavorite, removeFavorite, clearFavorites } = favoritesSlice.actions

// Selectors
export const selectFavoriteIds = (state) => state.favorites.items
export const selectIsFavorite = (productId) => (state) => 
  state.favorites.items.includes(productId)
export const selectFavoritesCount = (state) => state.favorites.items.length

export default favoritesSlice.reducer
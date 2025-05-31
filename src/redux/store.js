import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './slices/productsSlice'
import favoritesReducer from './slices/favoritesSlice'
import filtersReducer from './slices/filtersSlice'

// Setting up our Redux store with Redux Toolkit
// This is so much cleaner than the old Redux way!
export const store = configureStore({
  reducer: {
    // Each slice manages its own piece of state
    products: productsReducer,
    favorites: favoritesReducer,
    filters: filtersReducer,
  },
  // Redux Toolkit has great defaults, but we can customize if needed
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // Keeping serializable check on for better debugging
      serializableCheck: true,
    }),
})
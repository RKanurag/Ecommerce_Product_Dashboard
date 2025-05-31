import { createSlice } from '@reduxjs/toolkit'

// Managing all filter and search state
const initialState = {
  searchTerm: '',
  selectedCategory: 'all', // 'all' means no category filter
  sortBy: 'default', // 'default', 'price-asc', 'price-desc'
}

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    // Update search term (this will be debounced in the component)
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload.toLowerCase()
    },
    // Set category filter
    setCategory: (state, action) => {
      state.selectedCategory = action.payload
    },
    // Set sorting preference
    setSortBy: (state, action) => {
      state.sortBy = action.payload
    },
    // Reset all filters to default
    resetFilters: (state) => {
      state.searchTerm = ''
      state.selectedCategory = 'all'
      state.sortBy = 'default'
    },
  },
})

export const { setSearchTerm, setCategory, setSortBy, resetFilters } = filtersSlice.actions

// Selectors
export const selectSearchTerm = (state) => state.filters.searchTerm
export const selectCategory = (state) => state.filters.selectedCategory
export const selectSortBy = (state) => state.filters.sortBy

export default filtersSlice.reducer
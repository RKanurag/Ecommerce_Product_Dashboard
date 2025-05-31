import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchProducts, fetchProductById, fetchCategories } from '../../utils/api'

// Async thunk for fetching all products
// This handles the async logic and dispatches pending/fulfilled/rejected actions automatically
export const getProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await fetchProducts()
    return response
  }
)

// Fetch single product details
export const getProductDetails = createAsyncThunk(
  'products/fetchProductById',
  async (productId) => {
    const response = await fetchProductById(productId)
    return response
  }
)

// Fetch available categories for filtering
export const getCategories = createAsyncThunk(
  'products/fetchCategories',
  async () => {
    const response = await fetchCategories()
    return response
  }
)

const initialState = {
  // All products from the API
  items: [],
  // Currently selected product for detail view
  selectedProduct: null,
  // Available categories for filtering
  categories: [],
  // Loading states for better UX
  loading: false,
  categoriesLoading: false,
  detailLoading: false,
  // Error handling
  error: null,
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // Clear selected product when navigating away from detail page
    clearSelectedProduct: (state) => {
      state.selectedProduct = null
    },
  },
  extraReducers: (builder) => {
    // Handle async actions for fetching products
    builder
      // Products list cases
      .addCase(getProducts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
        // Sorting items by id for consistent ordering
        state.items.sort((a, b) => a.id - b.id)
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch products'
      })
      // Product detail cases
      .addCase(getProductDetails.pending, (state) => {
        state.detailLoading = true
        state.error = null
      })
      .addCase(getProductDetails.fulfilled, (state, action) => {
        state.detailLoading = false
        state.selectedProduct = action.payload
      })
      .addCase(getProductDetails.rejected, (state, action) => {
        state.detailLoading = false
        state.error = action.error.message || 'Failed to fetch product details'
      })
      // Categories cases
      .addCase(getCategories.pending, (state) => {
        state.categoriesLoading = true
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.categoriesLoading = false
        state.categories = action.payload
      })
      .addCase(getCategories.rejected, (state) => {
        state.categoriesLoading = false
        // Not showing error for categories as it's not critical
      })
  },
})

export const { clearSelectedProduct } = productsSlice.actions

// Selectors for accessing state
// Keeping these simple for now, more complex ones in productSelectors.js
export const selectAllProducts = (state) => state.products.items
export const selectProductsLoading = (state) => state.products.loading
export const selectProductsError = (state) => state.products.error
export const selectSelectedProduct = (state) => state.products.selectedProduct
export const selectCategories = (state) => state.products.categories

export default productsSlice.reducer
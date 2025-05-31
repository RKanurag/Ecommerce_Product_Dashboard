import { describe, it, expect } from 'vitest'
import productsReducer, {
  clearSelectedProduct,
  getProducts,
  getProductDetails,
  getCategories
} from '../../redux/slices/productsSlice'

// Testing the products slice reducers and actions
describe('productsSlice', () => {
  const initialState = {
    items: [],
    selectedProduct: null,
    categories: [],
    loading: false,
    categoriesLoading: false,
    detailLoading: false,
    error: null,
  }

  it('should return the initial state', () => {
    expect(productsReducer(undefined, { type: 'unknown' })).toEqual(initialState)
  })

  it('should handle clearSelectedProduct', () => {
    const previousState = {
      ...initialState,
      selectedProduct: { id: 1, title: 'Test Product' }
    }
    
    expect(productsReducer(previousState, clearSelectedProduct())).toEqual({
      ...previousState,
      selectedProduct: null
    })
  })

  // Testing async thunk states
  it('should handle getProducts.pending', () => {
    expect(productsReducer(initialState, { type: getProducts.pending.type })).toEqual({
      ...initialState,
      loading: true,
      error: null
    })
  })

  it('should handle getProducts.fulfilled', () => {
    const mockProducts = [
      { id: 1, title: 'Product 1', price: 10 },
      { id: 2, title: 'Product 2', price: 20 }
    ]
    
    expect(
      productsReducer(initialState, {
        type: getProducts.fulfilled.type,
        payload: mockProducts
      })
    ).toEqual({
      ...initialState,
      loading: false,
      items: mockProducts
    })
  })

  it('should handle getProducts.rejected', () => {
    const errorMessage = 'Failed to fetch products'
    
    expect(
      productsReducer(initialState, {
        type: getProducts.rejected.type,
        error: { message: errorMessage }
      })
    ).toEqual({
      ...initialState,
      loading: false,
      error: errorMessage
    })
  })

  it('should handle getProductDetails states', () => {
    // Test pending
    expect(
      productsReducer(initialState, { type: getProductDetails.pending.type })
    ).toEqual({
      ...initialState,
      detailLoading: true,
      error: null
    })

    // Test fulfilled
    const mockProduct = { id: 1, title: 'Test Product', price: 99.99 }
    expect(
      productsReducer(initialState, {
        type: getProductDetails.fulfilled.type,
        payload: mockProduct
      })
    ).toEqual({
      ...initialState,
      detailLoading: false,
      selectedProduct: mockProduct
    })
  })

  it('should handle getCategories.fulfilled', () => {
    const mockCategories = ['electronics', 'clothing', 'books']
    
    expect(
      productsReducer(initialState, {
        type: getCategories.fulfilled.type,
        payload: mockCategories
      })
    ).toEqual({
      ...initialState,
      categoriesLoading: false,
      categories: mockCategories
    })
  })
})
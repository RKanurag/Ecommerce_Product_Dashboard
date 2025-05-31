import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts, getCategories, selectProductsLoading, selectProductsError } from '../redux/slices/productsSlice'
import { selectFilteredProducts, selectFilteredCount } from '../redux/selectors/productSelectors'
import SearchBar from '../components/SearchBar'
import FilterBar from '../components/FilterBar'
import ProductGrid from '../components/ProductGrid'
import LoadingSpinner from '../components/common/LoadingSpinner'
import ErrorMessage from '../components/common/ErrorMessage'
import './ProductListing.css'

// Main product listing page
const ProductListing = () => {
  const dispatch = useDispatch()
  const products = useSelector(selectFilteredProducts)
  const loading = useSelector(selectProductsLoading)
  const error = useSelector(selectProductsError)
  const resultCount = useSelector(selectFilteredCount)
  
  // Fetch products and categories on component mount
  useEffect(() => {
    dispatch(getProducts())
    dispatch(getCategories())
  }, [dispatch])
  
  const handleRetry = () => {
    dispatch(getProducts())
  }
  
  // Show loading state
  if (loading && products.length === 0) {
    return (
      <div className="page-container">
        <LoadingSpinner text="Loading amazing products..." />
      </div>
    )
  }
  
  // Show error state
  if (error) {
    return (
      <div className="page-container">
        <ErrorMessage error={error} retry={handleRetry} />
      </div>
    )
  }
  
  return (
    <div className="page-container">
      <div className="container">
        <header className="page-header">
          <h1 className="page-title">Discover Amazing Products</h1>
          <p className="page-subtitle">
            Find exactly what you're looking for with our curated collection
          </p>
        </header>
        
        <div className="controls-section">
          <SearchBar />
          <FilterBar />
          
          {/* Show result count when filters are active */}
          {resultCount > 0 && (
            <p className="result-count">
              Showing {resultCount} {resultCount === 1 ? 'product' : 'products'}
            </p>
          )}
        </div>
        
        <ProductGrid products={products} />
      </div>
    </div>
  )
}

export default ProductListing
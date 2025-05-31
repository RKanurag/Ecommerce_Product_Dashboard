import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { 
  getProductDetails, 
  selectSelectedProduct, 
  selectProductsLoading,
  clearSelectedProduct 
} from '../redux/slices/productsSlice'
import { toggleFavorite, selectIsFavorite } from '../redux/slices/favoritesSlice'
import LoadingSpinner from '../components/common/LoadingSpinner'
import ErrorMessage from '../components/common/ErrorMessage'
import './ProductDetail.css'

// Product detail page component
const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const product = useSelector(selectSelectedProduct)
  const loading = useSelector(state => state.products.detailLoading)
  const error = useSelector(state => state.products.error)
  const isFavorite = useSelector(selectIsFavorite(parseInt(id)))
  
  // Fetch product details when component mounts or ID changes
  useEffect(() => {
    dispatch(getProductDetails(id))
    
    // Cleanup when component unmounts
    return () => {
      dispatch(clearSelectedProduct())
    }
  }, [dispatch, id])
  
  const handleFavoriteClick = () => {
    dispatch(toggleFavorite(parseInt(id)))
  }
  
  const handleBackClick = () => {
    navigate(-1)
  }
  
  // Loading state
  if (loading) {
    return (
      <div className="page-container">
        <LoadingSpinner text="Loading product details..." />
      </div>
    )
  }
  
  // Error state
  if (error) {
    return (
      <div className="page-container">
        <ErrorMessage 
          error={error} 
          retry={() => dispatch(getProductDetails(id))}
        />
        <button onClick={handleBackClick} className="btn btn-secondary">
          Go Back
        </button>
      </div>
    )
  }
  
  // No product found
  if (!product) {
    return (
      <div className="page-container">
        <ErrorMessage error="Product not found" />
        <button onClick={handleBackClick} className="btn btn-secondary">
          Go Back
        </button>
      </div>
    )
  }
  
  return (
    <div className="page-container">
      <div className="container">
        <button onClick={handleBackClick} className="back-button">
          ← Back to Products
        </button>
        
        <div className="product-detail">
          <div className="product-detail-image">
            <img 
              src={product.image} 
              alt={product.title}
              className="detail-image"
            />
          </div>
          
          <div className="product-detail-info">
            <div className="detail-header">
              <h1 className="detail-title">{product.title}</h1>
              <button
                onClick={handleFavoriteClick}
                className={`favorite-btn ${isFavorite ? 'active' : ''}`}
                aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                {isFavorite ? '❤️' : '🤍'} 
                {isFavorite ? 'Favorited' : 'Add to Favorites'}
              </button>
            </div>
            
            <div className="detail-meta">
              <span className="detail-category">{product.category}</span>
              <div className="detail-rating">
                <span className="stars">⭐ {product.rating?.rate || 0}</span>
                <span className="rating-count">({product.rating?.count || 0} reviews)</span>
              </div>
            </div>
            
            <div className="detail-price">
              <span className="price-label">Price:</span>
              <span className="price-value">${product.price.toFixed(2)}</span>
            </div>
            
            <div className="detail-description">
              <h2 className="description-title">Description</h2>
              <p className="description-text">{product.description}</p>
            </div>
            
            <div className="detail-actions">
              <button className="btn btn-primary add-to-cart">
                🛒 Add to Cart
              </button>
              <button className="btn btn-secondary buy-now">
                Buy Now
              </button>
            </div>
            
            {/* Additional info section */}
            <div className="additional-info">
              <h3>Product Information</h3>
              <ul className="info-list">
                <li>
                  <span className="info-label">SKU:</span>
                  <span className="info-value">PROD-{product.id}</span>
                </li>
                <li>
                  <span className="info-label">Category:</span>
                  <span className="info-value">{product.category}</span>
                </li>
                <li>
                  <span className="info-label">Availability:</span>
                  <span className="info-value">In Stock</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
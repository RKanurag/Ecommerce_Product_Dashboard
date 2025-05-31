import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toggleFavorite, selectIsFavorite } from '../redux/slices/favoritesSlice'
import './ProductCard.css'

// Individual product card component
const ProductCard = ({ product }) => {
  const dispatch = useDispatch()
  const isFavorite = useSelector(selectIsFavorite(product.id))
  
  const handleFavoriteClick = (e) => {
    // Prevent navigation when clicking favorite button
    e.preventDefault()
    dispatch(toggleFavorite(product.id))
  }
  
  // Truncate long titles for cleaner cards
  const truncateTitle = (title, maxLength = 50) => {
    if (title.length <= maxLength) return title
    return title.substring(0, maxLength) + '...'
  }
  
  return (
    <article className="product-card">
      <Link to={`/product/${product.id}`} className="product-link">
        <div className="product-image-container">
          <img 
            src={product.image} 
            alt={product.title}
            className="product-image"
            loading="lazy"
          />
          <button
            onClick={handleFavoriteClick}
            className={`favorite-button ${isFavorite ? 'active' : ''}`}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            {isFavorite ? '❤️' : '🤍'}
          </button>
        </div>
        
        <div className="product-info">
          <h3 className="product-title">{truncateTitle(product.title)}</h3>
          <p className="product-category">{product.category}</p>
          <div className="product-footer">
            <span className="product-price">${product.price.toFixed(2)}</span>
            <span className="product-rating">
              ⭐ {product.rating?.rate || 0} ({product.rating?.count || 0})
            </span>
          </div>
        </div>
      </Link>
    </article>
  )
}

export default ProductCard
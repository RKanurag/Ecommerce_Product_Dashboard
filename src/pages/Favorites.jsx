import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectFavoriteProducts } from '../redux/selectors/productSelectors'
import ProductGrid from '../components/ProductGrid'
import './Favorites.css'

// Favorites page component
const Favorites = () => {
  const favoriteProducts = useSelector(selectFavoriteProducts)
  
  // Empty state when no favorites
  if (favoriteProducts.length === 0) {
    return (
      <div className="page-container">
        <div className="container">
          <div className="empty-favorites">
            <span className="empty-icon">💔</span>
            <h2 className="empty-title">No Favorites Yet</h2>
            <p className="empty-message">
              Start adding products to your favorites and they'll appear here!
            </p>
            <Link to="/" className="btn btn-primary">
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="page-container">
      <div className="container">
        <header className="favorites-header">
          <h1 className="page-title">Your Favorites</h1>
          <p className="favorites-count">
            You have {favoriteProducts.length} favorite {favoriteProducts.length === 1 ? 'product' : 'products'}
          </p>
        </header>
        
        <ProductGrid products={favoriteProducts} />
      </div>
    </div>
  )
}

export default Favorites
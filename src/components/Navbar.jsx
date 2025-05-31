import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectFavoritesCount } from '../redux/slices/favoritesSlice'
import './Navbar.css'

// Navigation bar component with favorites counter
const Navbar = () => {
  const location = useLocation()
  const favoritesCount = useSelector(selectFavoritesCount)
  
  // Helper to check if link is active
  const isActive = (path) => location.pathname === path
  
  return (
    <nav className="navbar">
      <div className="navbar-container container">
        <Link to="/" className="navbar-brand">
          <span className="brand-icon">🛍️</span>
          <span className="brand-text">Shop Smart</span>
        </Link>
        
        <div className="navbar-links">
          <Link 
            to="/" 
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
          >
            Products
          </Link>
          
          <Link 
            to="/favorites" 
            className={`nav-link favorites-link ${isActive('/favorites') ? 'active' : ''}`}
          >
            <span className="heart-icon">❤️</span>
            Favorites
            {favoritesCount > 0 && (
              <span className="favorites-badge">{favoritesCount}</span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
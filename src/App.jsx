import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/common/Layout'
import ProductListing from './pages/ProductListing'
import ProductDetail from './pages/ProductDetail'
import Favorites from './pages/Favorites'
import './App.css'

// Main App component - keeping it clean with just routing logic
function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Home page shows all products */}
          <Route path="/" element={<ProductListing />} />
          
          {/* Product detail page with dynamic ID */}
          <Route path="/product/:id" element={<ProductDetail />} />
          
          {/* User's favorite products */}
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
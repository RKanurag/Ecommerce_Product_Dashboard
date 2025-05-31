import React from 'react'
import ProductCard from './ProductCard'
import './ProductGrid.css'

// Grid component for displaying products
const ProductGrid = ({ products }) => {
  if (products.length === 0) {
    return (
      <div className="no-products">
        <p>No products found matching your criteria.</p>
      </div>
    )
  }
  
  return (
    <div className="product-grid">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

export default ProductGrid
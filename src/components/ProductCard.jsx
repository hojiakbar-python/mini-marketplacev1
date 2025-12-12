import React from 'react'
import './ProductCard.css'

function ProductCard({ product, onAddToCart }) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} />
      <h3>{product.title}</h3>
      <p className="product-description">
        {product.description.substring(0, 80)}...
      </p>
      <div className="product-price">${product.price}</div>
      <button
        className="add-to-cart-btn"
        onClick={() => onAddToCart(product)}
      >
        Add to cart
      </button>
    </div>
  )
}

export default ProductCard

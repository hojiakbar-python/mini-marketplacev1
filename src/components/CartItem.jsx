import React from 'react'
import './CartItem.css'

function CartItem({ item, onRemove }) {
  return (
    <div className="cart-item">
      <img src={item.image} alt={item.title} />
      <div className="cart-item-info">
        <h4>{item.title}</h4>
        <p>Miqdor: {item.quantity}</p>
        <div className="cart-item-price">
          ${(item.price * item.quantity).toFixed(2)}
        </div>
      </div>
      <button
        className="cart-item-remove"
        onClick={() => onRemove(item.id)}
      >
        O'chirish
      </button>
    </div>
  )
}

export default CartItem

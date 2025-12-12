import { useState, useEffect } from 'react'
import ProductCard from './components/ProductCard'
import CartItem from './components/CartItem'
import './App.css'

function App() {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart')
    return savedCart ? JSON.parse(savedCart) : []
  })
  const [activeTab, setActiveTab] = useState('products')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products')
      const data = await response.json()
      setProducts(data)
      setLoading(false)
    } catch (error) {
      console.error('Mahsulotlar yuklanmadi:', error)
      setLoading(false)
    }
  }

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id)

    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ))
    } else {
      setCart([...cart, { ...product, quantity: 1 }])
    }
  }

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId))
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)
  }

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('Savat bo\'sh!')
      return
    }
    alert(`To'lov summasi: $${getTotalPrice()}\nTo'lov funksiyasi tez orada qo'shiladi!`)
  }

  return (
    <div className="app">
      <header className="header">
        <h1>Mini Marketplace</h1>
      </header>

      <main className="main">
        <div className="tabs">
          <button
            className={`tab-btn ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            Products
          </button>
          <button
            className={`tab-btn ${activeTab === 'cart' ? 'active' : ''}`}
            onClick={() => setActiveTab('cart')}
          >
            Cart
            {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
          </button>
        </div>

        {activeTab === 'products' && (
          <section className="products-section">
            {loading ? (
              <div className="loading">Mahsulotlar yuklanmoqda...</div>
            ) : (
              <div className="products-grid">
                {products.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={addToCart}
                  />
                ))}
              </div>
            )}
          </section>
        )}

        {activeTab === 'cart' && (
          <section className="cart-section">
            {cart.length === 0 ? (
              <p className="empty-cart">Savat bo'sh</p>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map(item => (
                    <CartItem
                      key={item.id}
                      item={item}
                      onRemove={removeFromCart}
                    />
                  ))}
                </div>
                <div className="cart-summary">
                  <h3>Umumiy summa: <span className="total-price">${getTotalPrice()}</span></h3>
                  <button className="checkout-btn" onClick={handleCheckout}>
                    To'lovga o'tish
                  </button>
                </div>
              </>
            )}
          </section>
        )}
      </main>
    </div>
  )
}

export default App

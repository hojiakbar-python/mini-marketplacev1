let cart = [];
let products = [];

const useState = (initialValue) => {
    let value = initialValue;
    const getValue = () => value;
    const setValue = (newValue) => {
        value = newValue;
        renderCart();
    };
    return [getValue, setValue];
};

const [getCart, setCart] = useState([]);

const fetchProducts = async () => {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        products = await response.json();
        renderProducts();
    } catch (error) {
        console.error('Mahsulotlar yuklanmadi:', error);
        document.getElementById('productsGrid').innerHTML =
            '<p class="loading">Xatolik yuz berdi. Iltimos qaytadan urinib ko\'ring.</p>';
    }
};

const renderProducts = () => {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>${product.description.substring(0, 80)}...</p>
            <div class="product-price">$${product.price}</div>
            <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                Add to cart
            </button>
        `;
        productsGrid.appendChild(productCard);
    });
};

const addToCart = (productId) => {
    const product = products.find(p => p.id === productId);
    if (product) {
        const currentCart = getCart();
        const existingItem = currentCart.find(item => item.id === productId);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            currentCart.push({ ...product, quantity: 1 });
        }

        setCart([...currentCart]);
        alert('Mahsulot savatga qo\'shildi!');
    }
};

const removeFromCart = (productId) => {
    const currentCart = getCart();
    const updatedCart = currentCart.filter(item => item.id !== productId);
    setCart(updatedCart);
};

const renderCart = () => {
    const cartItems = document.getElementById('cartItems');
    const currentCart = getCart();

    if (currentCart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Savat bo\'sh</p>';
        document.getElementById('totalPrice').textContent = '0';
        return;
    }

    cartItems.innerHTML = '';
    let total = 0;

    currentCart.forEach(item => {
        total += item.price * item.quantity;

        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <div class="cart-item-info">
                <h4>${item.title}</h4>
                <p>Miqdor: ${item.quantity}</p>
                <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
            </div>
            <button class="cart-item-remove" onclick="removeFromCart(${item.id})">
                O'chirish
            </button>
        `;
        cartItems.appendChild(cartItem);
    });

    document.getElementById('totalPrice').textContent = '$' + total.toFixed(2);
};

const switchTab = (tabName) => {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });

    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    document.getElementById(tabName).classList.add('active');
};

document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        switchTab(e.target.dataset.tab);
    });
});

document.getElementById('checkoutBtn').addEventListener('click', () => {
    const currentCart = getCart();
    if (currentCart.length === 0) {
        alert('Savat bo\'sh!');
        return;
    }
    alert('To\'lov funksiyasi tez orada qo\'shiladi!');
});

fetchProducts();

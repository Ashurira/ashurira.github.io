function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find(item => item.id === product.id);
  
    if (existing) {
      existing.qty += product.qty;
    } else {
      cart.push(product);
    }
  
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} added to cart!`);
    updateCartCount();
  }
  
  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const count = cart.reduce((sum, item) => sum + item.qty, 0);
    const badge = document.getElementById("cart-count");
    if (badge) badge.textContent = count;
  }
  
  // Only run the cart viewer part if those elements exist
  document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();
  
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartContainer = document.getElementById("cartItems");
    const grandTotalEl = document.getElementById("grandTotal");
  
    if (cartContainer && grandTotalEl) {
      if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
      } else {
        let grandTotal = 0;
  
        cart.forEach(item => {
          const itemTotal = item.price * item.qty;
          grandTotal += itemTotal;
  
          const div = document.createElement("div");
          div.classList.add("cart-item");
          div.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
            <h3>${item.name}</h3>
            <p>Price: $${item.price}</p>
            <p>
            Quantity: <input type="number" min="1" value="${item.qty}" onchange="updateQuantity(${item.id}, this.value)">
            </p>
            <p>Total: $${itemTotal.toFixed(2)}</p>
            <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
            </div>`;
          cartContainer.appendChild(div);
        });
  
        grandTotalEl.textContent = grandTotal.toFixed(2);
      }
    }
  });

  function updateQuantity(productId, newQty) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const item = cart.find(p => p.id === productId);
    if (item) {
      item.qty = parseInt(newQty);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload(); // Refresh cart to show updated totals
  }

  function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
  }
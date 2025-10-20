
let cart = [];
function addToCart(product){
    const existingProduct = cart.find(item => item.id ===product.id);
    if(existingProduct){
        existingProduct.quantity +=1;
    } else {
        cart.push({...product, quantity: 1});
    }
    renderCart();
}




function renderCart() {
  const cartContainer = document.getElementById("cartContainer");
  cartContainer.innerHTML = "<h3>Your Cart</h3>";

  if (cart.length === 0) {
    cartContainer.innerHTML += "<p>Cart is empty.</p>";
    return;
  }

  cart.forEach(item => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "cart-item";

    itemDiv.innerHTML = `
      <p><strong>${item.title}</strong></p>
      <p>Price: $${item.price}</p>
      <div class="quantity-controls">
        <button class="decrease" data-id="${item.id}">−</button>
        <span>${item.quantity}</span>
        <button class="increase" data-id="${item.id}">+</button>
        <button class="remove" data-id="${item.id}">🗑️</button>
      </div>
      <p>Total: $${(item.price * item.quantity).toFixed(2)}</p>
    `;

    cartContainer.appendChild(itemDiv);
  });

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  cartContainer.innerHTML += `<p><strong>Cart Total: $${total.toFixed(2)}</strong></p>`;

  // Attach event listeners
  cartContainer.querySelectorAll(".increase").forEach(btn =>
    btn.addEventListener("click", () => updateQuantity(btn.dataset.id, 1))
  );

  cartContainer.querySelectorAll(".decrease").forEach(btn =>
    btn.addEventListener("click", () => updateQuantity(btn.dataset.id, -1))
  );

  cartContainer.querySelectorAll(".remove").forEach(btn =>
    btn.addEventListener("click", () => removeFromCart(btn.dataset.id))
  );
}

// Quantity updater function
function updateQuantity(productId, change){
    const item = cart.find(i => i.id === productId);
    if(!item) return;

    item.quantity +=change;

    if(item.quantity <= 0){
        cart = cart.filter(p => p.id !=productId);
    }
    renderCart();
}
// Remove item from Cart
function removeFromCart(productId){
    cart = cart.filter(p => p.id !=productId);
    renderCart();
}

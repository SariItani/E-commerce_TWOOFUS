
let cart = JSON.parse(localStorage.getItem('cart')) || [];

document.addEventListener('DOMContentLoaded', () => {
    displayCart();
    updateOrderSummary();

    document.getElementById('clearCartBtn').addEventListener('click', clearCart);
});

function displayCart() {
    const cartItemsContainer = document.getElementById('cartItems');
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    cart.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.className = 'card';
        itemElement.innerHTML = `
            <div class="item-card">
                <div class="row g-0">
                    <div class="col-md-4">
                        <div class="image-thing">
                            ${item.image}
                        </div>
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${item.name}</h5>
                            <p class="card-text">Size: ${item.size}g</p>
                            <p class="card-text">Price: ${item.price}</p>
                            <div class="input-group mb-3" style="max-width: 200px;">
                                <button class="btn btn-outline-secondary" type="button" onclick="updateQuantity(${index}, -1)">-</button>
                                <input type="text" class="form-control text-center" value="${item.quantity}" readonly>
                                <button class="btn btn-outline-secondary" type="button" onclick="updateQuantity(${index}, 1)">+</button>
                            </div>
                            <button class="btn btn-danger" onclick="removeItem(${index})">Remove</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        cartItemsContainer.appendChild(itemElement);
    });
}

function updateQuantity(index, change) {
    cart[index].quantity += change;
    if (cart[index].quantity < 1) {
        cart[index].quantity = 1;
    }
    if (cart[index].quantity > 10) {
        cart[index].quantity = 10;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
    updateOrderSummary();
}

function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
    updateOrderSummary();
}

function updateOrderSummary() {
    const subtotal = cart.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0);
    const discount = subtotal > 100 ? subtotal * 0.1 : 0; // 10% discount for orders over $100
    const deliveryTaxes = subtotal > 0 ? 5 : 0; // Example: $5 flat rate for delivery and taxes
    const finalTotal = subtotal - discount + deliveryTaxes;

    document.getElementById('subtotal').textContent = subtotal.toFixed(2);
    document.getElementById('discount').textContent = discount.toFixed(2);
    document.getElementById('deliveryTaxes').textContent = deliveryTaxes.toFixed(2);
    document.getElementById('finalTotal').textContent = finalTotal.toFixed(2);
    const checkoutLink = document.getElementById('checkoutBtn');
    if (subtotal <= 0) {
        checkoutLink.removeAttribute('href'); 
    } else {
        checkoutLink.setAttribute('href', './checkout.html'); 
    }
}

function clearCart() {
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
    updateOrderSummary();
    // Redirect to home page after a short delay
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}

document.getElementById('checkoutForm').addEventListener('submit', function(event){
    event.preventDefault(); 
    if (!validateForm()) {
        return;
    }
    const paymentMethod = document.querySelector('input[name="pay"]:checked');
    if (paymentMethod){
        if (paymentMethod.id === 'card') {
            window.location.href = '../templates/payByCard.html';
        } else {
            clearCart();
            window.location.href = '../templates/orderComplete.html';
        }
    } else {
        alert('Please select a payment method.');
    }
});

function validateForm() {
    const requiredFields = ['fullname', 'email', 'phone', 'address', 'city', 'postalcode'];
    for (let field of requiredFields) {
        if (!document.getElementById(field).value.trim()) {
            alert(`Please fill in the ${field} field.`);
            return false;
        }
    }
    return true;
}

function clearCart() {
    localStorage.removeItem('cart');
}

document.addEventListener('DOMContentLoaded', function() {
    displayCartItems();
    updateTotalAmount();
});

function getTotal() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    return cart.reduce((total, item) => total + (parseFloat(item.price) * item.quantity), 0).toFixed(2);
}

function updateTotalAmount() {
    const totalAmount = document.getElementById("amount");
    totalAmount.innerHTML = "$" + getTotal();
}

function displayCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const cartItemsContainer = document.createElement('div');
    cartItemsContainer.id = 'cartItems';
    
    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.innerHTML = `
            <p>${item.name} - Size: ${item.size}g - Quantity: ${item.quantity} - Price: $${(parseFloat(item.price) * item.quantity).toFixed(2)}</p>
        `;
        cartItemsContainer.appendChild(itemElement);
    });

    const form = document.querySelector('form');
    const methodsSection = document.querySelector('.methods');
    form.insertBefore(cartItemsContainer, methodsSection);
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
            window.location.href = '../templates/orderComplete.html';
        }
    } else {
        alert('Please select a payment method.');
    }
});

function validateForm() {
    const requiredFields = ['fullname', 'email', 'address', 'city', 'state', 'zip'];
    for (let field of requiredFields) {
        if (!document.getElementById(field).value) {
            alert(`Please fill out the ${field} field.`);
            return false;
        }
    }
    return true;
}
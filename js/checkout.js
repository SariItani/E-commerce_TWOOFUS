document.addEventListener('DOMContentLoaded', function() {
    updateTotalAmount();
});

function updateTotalAmount() {
    const totalAmount = document.getElementById("amount");
    totalAmount.innerHTML = "$" + getTotal();
}

function getTotal() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const subtotal =cart.reduce((total, item) => total + (parseFloat(item.price) * item.quantity), 0);
    const discount = subtotal > 100 ? subtotal * 0.1 : 0;
    const deliveryTaxes =subtotal > 0 ? 5 : 0;
    const finalTotal = subtotal - discount + deliveryTaxes;

    return finalTotal.toFixed(2);
}

function clearCart() {
    localStorage.removeItem('cart');
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
    const requiredFields = ['fullname', 'email', 'address', 'city', 'state', 'zip'];
    for (let field of requiredFields) {
        if (!document.getElementById(field).value) {
            alert(`Please fill out the ${field} field.`);
            return false;
        }
    }
    return true;
}

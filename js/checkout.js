document.addEventListener('DOMContentLoaded', function() {
    const totalAmount = document.getElementById("amount");

    function getTotal() {
        //once the cart page is done this will get updated to calculate total amount of selected items 
        return 50.00;
    }

    totalAmount.innerHTML = getTotal() + "$";
});

document.getElementById('checkoutForm').addEventListener('submit', function(event){
    event.preventDefault(); 
    const paymentMethod = document.querySelector('input[name="pay"]:checked');
    if (paymentMethod){
        if (paymentMethod.id=== 'card') {
            window.location.href = '../templates/payByCard.html';
        } else {
            window.location.href= '../templates/orderComplete.html';
        }
    } else {
        alert('Please select a payment method.');
    }
});


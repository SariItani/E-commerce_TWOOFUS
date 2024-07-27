document.addEventListener('DOMContentLoaded', function() {
    const totalAmount = document.getElementById("amount");

    function getTotal() {
        //once the cart page is done this will get updated to calculate total amount of selected items 
        return 50.00;
    }

    totalAmount.innerHTML = getTotal() + "$";
});

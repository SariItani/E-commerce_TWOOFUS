document.addEventListener('DOMContentLoaded', function() {
    const totalAmount = document.getElementById("amount");

    function getTotal() {
        return 50.00;
    }

    totalAmount.innerHTML = getTotal() + "$";
});

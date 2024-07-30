// cart.js

let cart = JSON.parse(localStorage.getItem('cart')) || [];

document.addEventListener('DOMContentLoaded', () => {
  const addToCartBtn = document.getElementById('addToCartBtn');
  const favoriteBtn = document.getElementById('favoriteBtn');
  const sizeSelect = document.getElementById('size');
  const quantityInput = document.getElementById('quantity');

  addToCartBtn.addEventListener('click', addToCart);
  favoriteBtn.addEventListener('click', addToFavorites);
});

function addToCart() {
  const tea = JSON.parse(localStorage.getItem('selectedTea'));
  const size = document.getElementById('size').value;
  const quantity = document.getElementById('quantity').value;

  // Error detection for size selection
  if (size === '' || size === 'Select') {
    alert('Please select a size');
    return;
  }

  const cartItem = {
    id: tea.id,
    name: tea.name,
    price: tea.price,
    size: size,
    quantity: parseInt(quantity),
    image: tea.image // Add the image to the cart item
  };

  const existingItemIndex = cart.findIndex(item => item.id === cartItem.id && item.size === cartItem.size);

  if (existingItemIndex !== -1) {
    cart[existingItemIndex].quantity += cartItem.quantity;
  } else {
    cart.push(cartItem);
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  alert('Item added to cart!');
}

function addToFavorites() {
  // Implement favorite functionality here
  alert('Favorite functionality not implemented yet');
}
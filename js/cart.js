// ======= Variables =======
const cartItemsContainer = document.querySelector('.cart-items');
const emptyCartMessage = document.querySelector('.empty-cart');
const totalPriceContainer = document.querySelector('.cart-total');
const totalAmountElement = document.getElementById('total-amount');
const checkoutButtonWrapper = document.querySelector('.checkout-btn-wrapper');

// Retrieve cart from local storage or initialize empty array
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// ======= Functions =======

// Render cart items dynamically
function renderCartItems() {
    cartItemsContainer.innerHTML = ''; // Clear existing items
    let total = 0;

    if (cart.length === 0) {
        // Show empty cart message and hide other sections
        emptyCartMessage.style.display = 'flex';
        cartItemsContainer.style.display = 'none';
        totalPriceContainer.style.display = 'none';
        checkoutButtonWrapper.style.display = 'none';
    } else {
        // Hide empty cart message and show other sections
        emptyCartMessage.style.display = 'none';
        cartItemsContainer.style.display = 'block';
        totalPriceContainer.style.display = 'block';
        checkoutButtonWrapper.style.display = 'block';

        // Loop through cart items and render them
        cart.forEach((item) => {
            total += parseFloat(item.price.replace(',', '.').replace(' kr', '')); // Parse price
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.setAttribute('data-price', item.price);
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <span>${item.name}</span>
                <span>${item.quantity}</span>
                <span class="price">${item.price}</span>
                <button class="remove-btn">Remove</button>
            `;

            // Add event listener to remove button
            cartItem.querySelector('.remove-btn').addEventListener('click', () => removeItem(item.name));

            cartItemsContainer.appendChild(cartItem);
        });

        // Update total price
        totalAmountElement.textContent = `${total.toFixed(2)} kr`;
    }
}

// Add an item to the cart
function addToCart(product) {
    // Check if the product already exists in the cart
    const existingProduct = cart.find((item) => item.name === product.name);
    if (existingProduct) {
        existingProduct.quantity += 1; // Increment quantity
    } else {
        cart.push({ ...product, quantity: 1 }); // Add new product
    }

    localStorage.setItem('cart', JSON.stringify(cart)); // Update local storage
    renderCartItems(); // Re-render cart
    alert(`${product.name} has been added to the cart!`);
}

// Remove an item from the cart
function removeItem(name) {
    cart = cart.filter((item) => item.name !== name);
    localStorage.setItem('cart', JSON.stringify(cart)); // Update local storage
    renderCartItems(); // Re-render cart
}

// Initialize "Add to Cart" buttons
function initializeAddToCartButtons() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    addToCartButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            const product = {
                name: event.target.dataset.name,
                price: event.target.dataset.price,
                image: event.target.dataset.image,
            };

            addToCart(product);
        });
    });
}

// ======= Initialization =======
document.addEventListener('DOMContentLoaded', () => {
    renderCartItems(); // Render cart items on page load
    initializeAddToCartButtons(); // Initialize "Add to Cart" functionality
});

// ======= Variables =======
const cartItemsContainer = document.querySelector('.cart-items');
const emptyCartMessage = document.querySelector('.empty-cart');
const totalPriceContainer = document.querySelector('.cart-total');
const totalAmountElement = document.getElementById('total-amount');
const checkoutButtonWrapper = document.querySelector('.checkout-btn-wrapper');
const checkoutButton = document.querySelector('.checkout-btn'); 

let cart = JSON.parse(localStorage.getItem('cart')) || [];

// ======= Functions =======

function validateDOMElements() {
    if (!cartItemsContainer || !emptyCartMessage || !totalPriceContainer || !checkoutButtonWrapper || !totalAmountElement || !checkoutButton) {
        console.error("Error: One or more cart elements are missing from the DOM.");
        return false;
    }
    return true;
}


function renderCartItems() {
    if (!validateDOMElements()) return;

    cartItemsContainer.innerHTML = ''; 
    let total = 0;

    if (cart.length === 0) {
        emptyCartMessage.style.display = 'flex';
        cartItemsContainer.style.display = 'none';
        totalPriceContainer.style.display = 'none';
        checkoutButtonWrapper.style.display = 'none';
    } else {
        emptyCartMessage.style.display = 'none';
        cartItemsContainer.style.display = 'block';
        totalPriceContainer.style.display = 'block';
        checkoutButtonWrapper.style.display = 'block';

        cart.forEach((item) => {
            const productTitle = item.title || 'Unnamed Product';
            const productPrice = Number(item.price) || 0;
            total += productPrice * item.quantity;

            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <img src="${item.image || 'default-image.webp'}" alt="${productTitle}">
                <span>${productTitle}</span>
                <div class="quantity-controls">
                    <button class="decrease-btn" data-title="${productTitle}">-</button>
                    <span>Qty: ${item.quantity}</span>
                    <button class="increase-btn" data-title="${productTitle}">+</button>
                </div>
                <span class="price">${(productPrice * item.quantity).toFixed(2)} $</span>
                <button class="remove-btn" data-title="${productTitle}">Remove</button>
            `;

            cartItem.querySelector('.decrease-btn').addEventListener('click', () => adjustQuantity(productTitle, -1));
            cartItem.querySelector('.increase-btn').addEventListener('click', () => adjustQuantity(productTitle, 1));
            cartItem.querySelector('.remove-btn').addEventListener('click', () => removeItem(productTitle));

            cartItemsContainer.appendChild(cartItem);
        });

        totalAmountElement.textContent = `${total.toFixed(2)} $`;
    }
}


if (checkoutButton) {
    checkoutButton.addEventListener('click', () => {
        console.log("Proceeding to checkout...");
        window.location.href = 'checkout.html';
    });
}


function addToCart(product) {
    const existingProduct = cart.find((item) => item.title === product.title);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({
            title: product.title || `Unnamed Product`,
            price: parseFloat(product.price) || 0,
            image: product.image || 'default-image.webp',
            quantity: 1,
        });
    }

    console.log('Product added:', product);
    console.log('Updated cart:', cart);

    localStorage.setItem('cart', JSON.stringify(cart));
    renderCartItems();
}


function adjustQuantity(title, adjustment) {
    const product = cart.find((item) => item.title === title);
    if (product) {
        product.quantity += adjustment;
        if (product.quantity <= 0) {
            removeItem(title);
        } else {
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCartItems();
        }
    }
}


function removeItem(title) {
    console.log('Removing item:', title);

    if (!title) {
        console.error('Error: title is undefined or null.');
        return;
    }

    const originalCartLength = cart.length;
    cart = cart.filter((item) => item.title && item.title.trim() !== title.trim());

    console.log('Updated cart:', cart);
    console.log('Items removed:', originalCartLength - cart.length);

    localStorage.setItem('cart', JSON.stringify(cart));
    renderCartItems();
}

// ======= Initialization =======
document.addEventListener('DOMContentLoaded', () => {
    if (validateDOMElements()) {
        renderCartItems();
    }
});


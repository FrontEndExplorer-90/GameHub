// ======= Variables =======
const cartItemsContainer = document.querySelector('.cart-items');
const totalDisplay = document.querySelector('.summary-totals .total span:last-child');
const shippingDisplay = document.querySelector('.summary-totals .shipping span:last-child');
const finalTotalDisplay = document.querySelector('.summary-totals .final-total span:last-child');
const promoInput = document.getElementById('promocode');
const applyPromoButton = document.querySelector('.apply-promo-btn');
const checkoutButton = document.querySelector('.checkout-btn');

// Constants
const SHIPPING_COST = 99; // Fixed shipping cost
const PROMO_CODE = 'SAVE10'; // Example promo code
const PROMO_DISCOUNT = 10; // Discount percentage for promo code

// Retrieve cart from local storage or initialize empty array
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// ======= Functions =======

// Render cart items dynamically
function renderCartItems() {
    cartItemsContainer.innerHTML = ''; // Clear existing items
    let total = 0;

    if (cart.length === 0) {
        // If cart is empty
        cartItemsContainer.innerHTML = '<p>Your cart is empty!</p>';
        totalDisplay.textContent = '0kr';
        shippingDisplay.textContent = '0kr';
        finalTotalDisplay.textContent = '0kr';
        return;
    }

    // Loop through cart items and render them
    cart.forEach((item) => {
        total += item.price * item.quantity; // Calculate total price

        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <img src="${item.image || 'default-image.png'}" alt="${item.name}">
            <span>${item.name}</span>
            <span>${item.quantity}</span>
            <span class="price">${(item.price * item.quantity).toFixed(2)} kr</span>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    // Update total price
    totalDisplay.textContent = `${total.toFixed(2)}kr`;
    updateFinalTotal(total);
}

// Update final total (including shipping and promo code discount)
function updateFinalTotal(total) {
    const promoDiscount = calculatePromoDiscount(total);
    const finalTotal = total - promoDiscount + SHIPPING_COST;

    shippingDisplay.textContent = `${SHIPPING_COST}kr`;
    finalTotalDisplay.textContent = `${finalTotal.toFixed(2)}kr`;
}

// Calculate promo discount
function calculatePromoDiscount(total) {
    if (promoInput.value.trim().toUpperCase() === PROMO_CODE) {
        return (PROMO_DISCOUNT / 100) * total;
    }
    return 0;
}

// Apply promo code
function applyPromo() {
    const total = parseFloat(totalDisplay.textContent.replace('kr', ''));
    const promoDiscount = calculatePromoDiscount(total);

    if (promoDiscount > 0) {
        alert(`Promo code applied! You saved ${promoDiscount.toFixed(2)}kr.`);
    } else {
        alert('Invalid promo code!');
    }
    updateFinalTotal(total);
}

// Handle payment
function processPayment() {
    if (cart.length === 0) {
        alert('Your cart is empty! Add some items before proceeding.');
        return;
    }

    const finalTotal = finalTotalDisplay.textContent.replace('kr', '').trim();

    localStorage.removeItem('cart'); // Clear the cart
    location.href = 'purchase.html'; // Redirect to purchase page
}

// ======= Initialization =======
document.addEventListener('DOMContentLoaded', () => {
    renderCartItems(); // Render cart items on page load

    // Add event listener for promo code
    applyPromoButton.addEventListener('click', applyPromo);

    // Add event listener for checkout button
    checkoutButton.addEventListener('click', processPayment);
});

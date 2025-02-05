// ======= Variables =======
const cartItemsContainer = document.querySelector('.cart-items');
const totalDisplay = document.querySelector('.summary-totals .total span:last-child');
const shippingDisplay = document.querySelector('.summary-totals .shipping span:last-child');
const finalTotalDisplay = document.querySelector('.summary-totals .final-total span:last-child');
const promoInput = document.getElementById('promocode');
const applyPromoButton = document.querySelector('.apply-promo-btn');
const checkoutButton = document.querySelector('.checkout-btn');
const discountRow = document.querySelector('.discount-row'); 
const discountDisplay = document.querySelector('.discount'); 

const SHIPPING_COST = 8; 
const PROMO_CODE = 'SAVE10'; 
const PROMO_DISCOUNT = 10; 

let cart = JSON.parse(localStorage.getItem('cart')) || [];

// ======= Functions =======

function renderCartItems() {
    cartItemsContainer.innerHTML = ''; 
    let total = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty!</p>';
        totalDisplay.textContent = '0$';
        shippingDisplay.textContent = '0$';
        finalTotalDisplay.textContent = '0$';
        if (discountRow) discountRow.style.display = 'none'; // Skjul rabattfelt
        return;
    }

    cart.forEach((item) => {
        total += item.price * item.quantity;

        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <img src="${item.image || 'default-image.webp'}" alt="${item.name}">
            <span>${item.title || 'Unknown'}</span>
            <span>${item.quantity}</span>
            <span class="price">${(item.price * item.quantity).toFixed(2)} $</span>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    totalDisplay.textContent = `${total.toFixed(2)}$`;
    updateFinalTotal(total);
}

function updateFinalTotal(total) {
    const promoDiscount = calculatePromoDiscount(total);
    const finalTotal = total - promoDiscount + SHIPPING_COST;

    shippingDisplay.textContent = `${SHIPPING_COST}$`;
    finalTotalDisplay.textContent = `${finalTotal.toFixed(2)}$`;

    if (discountRow && discountDisplay) {
        if (promoDiscount > 0) {
            discountRow.style.display = 'flex';
            discountDisplay.textContent = `- ${promoDiscount.toFixed(2)}$`;
        } else {
            discountRow.style.display = 'none';
        }
    }
}

function calculatePromoDiscount(total) {
    return promoInput.value.trim().toUpperCase() === PROMO_CODE ? (PROMO_DISCOUNT / 100) * total : 0;
}

function applyPromo() {
    let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    updateFinalTotal(total);
}

function processPayment() {
    if (cart.length === 0) {
        alert('Your cart is empty! Add some items before proceeding.');
        return;
    }

    localStorage.removeItem('cart'); 
    location.href = 'purchase.html'; 
}

// ======= Initialization =======
document.addEventListener('DOMContentLoaded', () => {
    renderCartItems(); 
    applyPromoButton.addEventListener('click', applyPromo);
    checkoutButton.addEventListener('click', processPayment);
});

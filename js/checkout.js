// ======= Variables =======
const cartItemsContainer = document.querySelector('.cart-items');
const totalDisplay = document.querySelector('.summary-totals .total span:last-child');
const shippingDisplay = document.querySelector('.summary-totals .shipping span:last-child');
const finalTotalDisplay = document.querySelector('.summary-totals .final-total span:last-child');
const promoInput = document.getElementById('promocode');
const applyPromoButton = document.querySelector('.apply-promo-btn');
const checkoutButton = document.querySelector('.checkout-btn');


const SHIPPING_COST = 99; 
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
        return;
    }

    
    cart.forEach((item) => {
        total += item.price * item.quantity; 

        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <img src="${item.image || 'default-image.webp'}" alt="${item.name}">
            <span>${item.name}</span>
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
}


function calculatePromoDiscount(total) {
    if (promoInput.value.trim().toUpperCase() === PROMO_CODE) {
        return (PROMO_DISCOUNT / 100) * total;
    }
    return 0;
}


function applyPromo() {
    const total = parseFloat(totalDisplay.textContent.replace('$', ''));
    const promoDiscount = calculatePromoDiscount(total);

    if (promoDiscount > 0) {
        alert(`Promo code applied! You saved ${promoDiscount.toFixed(2)}$.`);
    } else {
        alert('Invalid promo code!');
    }
    updateFinalTotal(total);
}


function processPayment() {
    if (cart.length === 0) {
        alert('Your cart is empty! Add some items before proceeding.');
        return;
    }

    const finalTotal = finalTotalDisplay.textContent.replace('$', '').trim();

    localStorage.removeItem('cart'); 
    location.href = 'purchase.html'; 
}

// ======= Initialization =======
document.addEventListener('DOMContentLoaded', () => {
    renderCartItems(); 

    
    applyPromoButton.addEventListener('click', applyPromo);

    
    checkoutButton.addEventListener('click', processPayment);
});

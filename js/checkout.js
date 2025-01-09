// ======= Variables =======
const cartItems = document.querySelectorAll('.cart-item');
const promoInput = document.getElementById('promocode');
const applyPromoButton = document.querySelector('.apply-promo-btn');
const totalElement = document.querySelector('.summary-totals .total span:last-child');
const shippingElement = document.querySelector('.summary-totals .shipping span:last-child');
const finalTotalElement = document.querySelector('.summary-totals .final-total span:last-child');
const paymentMethods = document.querySelectorAll('.payment-card input');

// Default prices
let cartTotal = 0;
const shippingCost = 99; // Fixed shipping cost

// Promo codes and discounts
const promoCodes = {
    GAME10: 0.1, // 10% discount
    GAME20: 0.2, // 20% discount
};

// ======= Functions =======

// Calculate the total price of the cart
function calculateCartTotal() {
    cartTotal = 0; // Reset total
    cartItems.forEach((item) => {
        const priceText = item.querySelector('.price').textContent;
        const price = parseInt(priceText.replace('kr', '').trim());
        cartTotal += price;
    });
    updateFinalTotal();
}

// Update the final total (including shipping and discounts)
function updateFinalTotal(discount = 0) {
    const discountedTotal = cartTotal * (1 - discount);
    const finalTotal = discountedTotal + shippingCost;

    // Update the DOM
    totalElement.textContent = `${discountedTotal.toFixed(2)}kr`;
    finalTotalElement.textContent = `${finalTotal.toFixed(2)}kr`;
}

// Apply a promo code
function applyPromoCode() {
    const promoCode = promoInput.value.trim().toUpperCase();
    if (promoCodes[promoCode]) {
        const discount = promoCodes[promoCode];
        updateFinalTotal(discount);
        alert(`Promo code "${promoCode}" applied! You got a ${discount * 100}% discount.`);
    } else {
        alert('Invalid promo code. Please try again.');
        updateFinalTotal(); // Reset to default
    }
}

// Highlight selected payment method
function highlightSelectedPayment() {
    paymentMethods.forEach((method) => {
        const parentLabel = method.closest('.payment-card');
        if (method.checked) {
            parentLabel.style.backgroundColor = '#2B88D9';
        } else {
            parentLabel.style.backgroundColor = '#222';
        }
    });
}

// ======= Event Listeners =======
document.addEventListener('DOMContentLoaded', () => {
    // Initial calculation of cart total
    calculateCartTotal();

    // Add event listener for applying promo codes
    applyPromoButton.addEventListener('click', applyPromoCode);

    // Add event listener for payment method selection
    paymentMethods.forEach((method) => {
        method.addEventListener('change', highlightSelectedPayment);
    });
});

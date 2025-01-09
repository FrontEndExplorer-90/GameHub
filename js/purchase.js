document.addEventListener('DOMContentLoaded', () => {
    // Clear the cart from localStorage
    localStorage.removeItem('cart');

    // Optional: Notify the user that the cart has been cleared
    console.log('Cart cleared after purchase.');
});

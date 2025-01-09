// ======= Variables =======
const addToCartButton = document.querySelector('.add-to-cart-btn');
const gameDetailsSection = document.querySelector('.game-details');
const priceElement = document.querySelector('.price');
const cart = JSON.parse(localStorage.getItem('cart')) || []; // Retrieve existing cart from local storage

// ======= Functions =======

// Add item to the cart
function addToCart() {
    const product = {
        name: 'Cyberpunk: Rise of the Rebel',
        price: priceElement.textContent.trim(),
        image: 'images/GameHub_covers9.jpg', // Update this path if needed
        quantity: 1, // Default quantity
    };

    // Check if the product already exists in the cart
    const existingProduct = cart.find((item) => item.name === product.name);

    if (existingProduct) {
        // Increment quantity if already in the cart
        existingProduct.quantity += 1;
    } else {
        // Add new product to the cart
        cart.push(product);
    }

    // Save updated cart to local storage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Notify user
    alert(`${product.name} has been added to your cart!`);
}

// Toggle game features visibility
function toggleGameFeatures() {
    const featuresList = gameDetailsSection.querySelector('ul');
    const toggleButton = gameDetailsSection.querySelector('.toggle-features-btn');

    if (featuresList.style.display === 'none') {
        featuresList.style.display = 'block';
        toggleButton.textContent = 'Hide Features';
    } else {
        featuresList.style.display = 'none';
        toggleButton.textContent = 'Show Features';
    }
}

// ======= Event Listeners =======
document.addEventListener('DOMContentLoaded', () => {
    // Add-to-cart button functionality
    addToCartButton.addEventListener('click', addToCart);

    // Add a toggle button for game features
    const toggleButton = document.createElement('button');
    toggleButton.textContent = 'Hide Features';
    toggleButton.classList.add('toggle-features-btn');
    gameDetailsSection.insertBefore(toggleButton, gameDetailsSection.querySelector('ul'));
    toggleButton.addEventListener('click', toggleGameFeatures);
});

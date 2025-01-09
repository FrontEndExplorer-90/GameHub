// Get all Add to Cart buttons
const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

// Cart stored in localStorage (or empty array if not initialized)
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Add click event listeners to all buttons
addToCartButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        // Get game details (parent container's details)
        const gameItem = button.closest('.game-item');
        const gameName = gameItem.querySelector('h2').textContent;
        const gamePrice = gameItem.querySelector('p').textContent;
        const gameImage = gameItem.querySelector('img').src;

        // Check if the item already exists in the cart
        const existingItem = cart.find(item => item.name === gameName);

        if (existingItem) {
            alert(`${gameName} is already in the cart.`);
        } else {
            // Add new game to the cart
            cart.push({ name: gameName, price: gamePrice, image: gameImage });
            alert(`${gameName} has been added to the cart!`);
        }

        // Save updated cart to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
    });
});

// Optional: Display the number of items in the cart (header icon)
function updateCartIcon() {
    const cartIcon = document.querySelector('.header-icons a[href="cart.html"] img');
    if (cartIcon) {
        const cartCount = cart.length;
        cartIcon.setAttribute('title', `Cart (${cartCount} items)`);
    }
}

// Run on page load
updateCartIcon();


// -----------------------------------------------------------------

// Dynamic Cart Rendering for cart.html
if (document.body.classList.contains('cart-page')) {
    // Fetch cart data from localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Select the cart container
    const cartContainer = document.querySelector('.cart-items');

    // Generate HTML for each item in the cart
    if (cart.length === 0) {
        // Show "Cart is empty" message
        cartContainer.innerHTML = `<h2>Your Cart is Empty!</h2>`;
    } else {
        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <span>${item.name}</span>
                <span>${item.price}</span>
                <button class="remove-btn" data-index="${index}">Remove</button>
            `;
            cartContainer.appendChild(cartItem);
        });

        // Add functionality to remove items from the cart
        document.querySelectorAll('.remove-btn').forEach((button) => {
            button.addEventListener('click', (e) => {
                const index = e.target.dataset.index;
                cart.splice(index, 1); // Remove item from cart array
                localStorage.setItem('cart', JSON.stringify(cart)); // Update localStorage
                location.reload(); // Reload page to reflect changes
            });
        });

        // Update total price
        const totalPrice = cart.reduce((total, item) => {
            const price = parseFloat(item.price.replace(' kr', ''));
            return total + price;
        }, 0);

        // Add total price to the DOM
        const totalElement = document.createElement('div');
        totalElement.classList.add('cart-total');
        totalElement.innerHTML = `<h2>Total Price: ${totalPrice} kr</h2>`;
        cartContainer.appendChild(totalElement);
    }
}
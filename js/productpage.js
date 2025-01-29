const baseAPIUrl = "https://v2.api.noroff.dev/gamehub/";

// Get product ID from URL
function getProductIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
}

// Fetch product data by ID
async function fetchProductById(productId) {
    try {
        const response = await fetch(`${baseAPIUrl}${productId}`);
        if (!response.ok) throw new Error("Failed to fetch product.");
        return response.json(); // Return product data
    } catch (error) {
        console.error(error);
        document.body.innerHTML = '<h1>Failed to load product details. Please try again later.</h1>';
    }
}

// Add "Add to Cart" button dynamically
function createAddToCartButton(product) {
    const productDetails = document.getElementById('product-details');

    // Create button element
    const addToCartButton = document.createElement('button');
    addToCartButton.textContent = "Add to Cart";
    addToCartButton.classList.add('add-to-cart-btn');

    // Add event listener for the button
    addToCartButton.addEventListener('click', () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingProduct = cart.find(item => item.id === product.id);

        if (existingProduct) {
            // Increment quantity if product is already in the cart
            existingProduct.quantity += 1;
        } else {
            // Add new product to the cart
            cart.push({
                id: product.id,
                title: product.title,
                price: product.discountedPrice || product.price,
                image: product.image.url,
                quantity: 1,
            });
        }

        // Save the cart to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${product.title} has been added to your cart!`);
    });

    // Append button to the product details container
    productDetails.appendChild(addToCartButton);
}

// Display product data on the page
async function displayProduct() {
    const productId = getProductIdFromUrl();
    if (!productId) {
        document.body.innerHTML = "<h1>Product ID not found in URL.</h1>";
        return;
    }

    const product = await fetchProductById(productId);
    if (product && product.data) {
        const { title, description, image, price, discountedPrice, onSale, tags } = product.data;

        // Update page title
        document.title = title;

        // Update product image
        const productImage = document.getElementById("product-image");
        if (productImage) {
            productImage.src = image.url;
            productImage.alt = image.alt || title;
        }

        // Update product details
        document.getElementById("page-title").textContent = title;
        document.getElementById("product-desc").textContent = description;
        document.getElementById("product-price").textContent = onSale
            ? `Sale Price: ${discountedPrice} kr (Original: ${price} kr)`
            : `${price} kr`;

        // Optionally display tags
        const productTags = document.getElementById("product-tags");
        if (productTags && tags) {
            productTags.textContent = `Tags: ${tags.join(", ")}`;
        }

        // Add "Add to Cart" button
        createAddToCartButton(product.data);
    }
}

// Initialize product page
displayProduct();


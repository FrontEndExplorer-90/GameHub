const baseAPIUrl = "https://v2.api.noroff.dev/gamehub/";

function getProductIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
}

async function fetchProductById(productId) {
    try {
        const response = await fetch(`${baseAPIUrl}${productId}`);
        if (!response.ok) throw new Error("Failed to fetch product.");
        const jsonData = await response.json();
        return jsonData.data || null; 
    } catch (error) {
        document.body.innerHTML = '<h1>Failed to load product details. Please try again later.</h1>';
        return null;
    }
}

function showPopupMessage(message) {
    const existingPopup = document.querySelector(".cart-popup");
    if (existingPopup) {
        existingPopup.remove();
    }

    const popup = document.createElement("div");
    popup.classList.add("cart-popup");
    popup.textContent = message;
    document.body.appendChild(popup);

    setTimeout(() => {
        popup.classList.add("fade-out");
        setTimeout(() => popup.remove(), 500);
    }, 2000);
}


function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    
    const cartCountElement = document.querySelector(".cart-icon span");
    if (cartCountElement) {
        cartCountElement.textContent = totalItems > 0 ? totalItems : '';
    }
}

function createAddToCartButton(product) {
    if (!product) return; 

    const productDetails = document.getElementById('product-details');
    if (!productDetails) return;

    const addToCartButton = document.createElement('button');
    addToCartButton.textContent = "Add to Cart";
    addToCartButton.classList.add('add-to-cart-btn');

    addToCartButton.addEventListener('click', () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingProduct = cart.find(item => item.id === product.id);

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({
                id: product.id,
                title: product.title,
                price: product.discountedPrice || product.price,
                image: product.image.url,
                quantity: 1
            });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        showPopupMessage(`${product.title} has been added to your cart!`); 
        updateCartCount();
    });

    productDetails.appendChild(addToCartButton);
}

async function displayProduct() {
    const productId = getProductIdFromUrl();
    if (!productId) {
        document.body.innerHTML = "<h1>Product ID not found in URL.</h1>";
        return;
    }

    const product = await fetchProductById(productId);
    if (!product) return; 

    const { title, description, image, price, discountedPrice, onSale, tags } = product;
    document.title = title;

    const productImage = document.getElementById("product-image");
    if (productImage) {
        productImage.src = image?.url || "../images/default-image.webp";
        productImage.alt = image?.alt || title || "Game image";
    }

    document.getElementById("page-title").textContent = title || "Game Title Not Found";
    document.getElementById("product-desc").textContent = description || "No description available.";
    document.getElementById("product-price").textContent = onSale
        ? `Sale Price: ${discountedPrice} $ (Original: ${price} $)`
        : `${price} $`;

    const productTags = document.getElementById("product-tags");
    if (productTags && tags) {
        productTags.textContent = `Tags: ${tags.join(", ")}`;
    }

    createAddToCartButton(product);
}

document.addEventListener("DOMContentLoaded", () => {
    displayProduct();
    updateCartCount();
});

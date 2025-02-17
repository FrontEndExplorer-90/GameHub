const baseAPIUrl = "https://v2.api.noroff.dev/gamehub/";

function getProductIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
}

async function fetchProductById(productId) {
    try {
        const response = await fetch(`${baseAPIUrl}${productId}`);
        if (!response.ok) throw new Error("Failed to fetch product.");
        return response.json(); 
    } catch (error) {

        document.body.innerHTML = '<h1>Failed to load product details. Please try again later.</h1>';
    }
}

function createAddToCartButton(product) {
    const productDetails = document.getElementById('product-details');
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
                quantity: 1,
            });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${product.title} has been added to your cart!`);
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
    if (product && product.data) {
        const { title, description, image, price, discountedPrice, onSale, tags } = product.data;
        document.title = title;

        const productImage = document.getElementById("product-image");
        if (productImage) {
            productImage.src = image?.url || "images/default-image.webp"; 
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

        createAddToCartButton(product.data);
    }
}

displayProduct();

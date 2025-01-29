const baseAPIUrl = "https://v2.api.noroff.dev/gamehub/";
const gameListContainer = document.querySelector('.game-list');

// Hent alle spill fra API
async function fetchAllProducts() {
    try {
        const response = await fetch(baseAPIUrl);
        if (!response.ok) {
            throw new Error("Failed to fetch products");
        }
        const jsonData = await response.json();
        return jsonData.data || []; // Spillene finnes i `data`
    } catch (error) {
        console.error("Error fetching products:", error);
        gameListContainer.innerHTML = `<p class="error-message">Failed to load products. Please try again later.</p>`;
        return [];
    }
}

// Generer HTML for spill
function renderProducts(products) {
    gameListContainer.innerHTML = ''; // Tømmer containeren

    if (products.length === 0) {
        gameListContainer.innerHTML = `<p class="error-message">No products available at the moment.</p>`;
        return;
    }

    products.forEach(product => {
        const productHTML = `
            <div class="game-item">
                <a href="productpage.html?id=${product.id}">
                    <img src="${product.image.url}" alt="${product.image.alt || product.title}">
                </a>
                <h2>${product.title}</h2>
                <p>${product.onSale ? `<s>${product.price} kr</s> ${product.discountedPrice} kr` : `${product.price} kr`}</p>
                <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
            </div>
        `;
        gameListContainer.innerHTML += productHTML;
    });

    attachAddToCartEvents(products);
}

// Legg til spill i handlekurven
function attachAddToCartEvents(products) {
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = e.target.dataset.id;
            const product = products.find(p => p.id === productId);

            if (product) {
                addToCart(product);
                alert(`${product.title} has been added to your cart!`);
            }
        });
    });
}

// Funksjon for å legge til spill i handlekurven
function addToCart(product) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            title: product.title,
            price: product.discountedPrice || product.price,
            quantity: 1,
            image: product.image.url
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart)); // Oppdaterer localStorage
}

// Start applikasjonen
async function init() {
    const products = await fetchAllProducts();
    renderProducts(products);
}

document.addEventListener('DOMContentLoaded', init);

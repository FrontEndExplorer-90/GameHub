const baseAPIUrl = "https://v2.api.noroff.dev/gamehub/";
const gameListContainer = document.querySelector(".game-list");
const categoryFilter = document.getElementById("category-filter");
const priceFilter = document.getElementById("price-filter");
const releaseFilter = document.getElementById("release-filter");
const resetFiltersBtn = document.getElementById("reset-filters");
const genreLinks = document.querySelectorAll("#genre-list a");

const cartIcon = document.querySelector(".cart-icon");
const cartCount = document.createElement("span");
cartCount.classList.add("cart-count");
cartIcon.appendChild(cartCount);

let allProducts = [];

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    cartCount.textContent = totalItems > 0 ? totalItems : '';
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


async function fetchAllProducts() {
    try {
        const response = await fetch(baseAPIUrl);
        if (!response.ok) {
            throw new Error("Failed to fetch products");
        }
        const jsonData = await response.json();
        return jsonData.data || [];
    } catch (error) {
        gameListContainer.innerHTML = `<p class="error-message">Failed to load products. Please try again later.</p>`;
        return [];
    }
}

function renderProducts(products) {
    gameListContainer.innerHTML = "";

    if (products.length === 0) {
        gameListContainer.innerHTML = `<p class="error-message">No products available based on the selected filters.</p>`;
        return;
    }

    products.forEach((product) => {
        const productHTML = `
            <div class="game-item">
                <a href="productpage.html?id=${product.id}">
                    <img src="${product.image.url}" alt="${product.image.alt || product.title}">
                </a>
                <h2>${product.title}</h2>
                <p>
                    ${product.onSale
                        ? `<s>${product.price} $</s> ${product.discountedPrice} $`
                        : `${product.price} $`}
                </p>
                <p>Release: ${product.released}</p>
                <button class="add-to-cart-btn" data-id="${product.id}">
                    Add to Cart
                </button>
            </div>
        `;
        gameListContainer.innerHTML += productHTML;
    });

    attachAddToCartEvents(products);
}

function filterProductsBySearch(searchTerm) {
    const lowerCaseSearch = searchTerm.toLowerCase();
    const filteredGames = allProducts.filter((game) =>
        game.title.toLowerCase().includes(lowerCaseSearch)
    );

    if (filteredGames.length === 1) {
        window.location.href = `productpage.html?id=${filteredGames[0].id}`;
    } else if (filteredGames.length > 1) {
        renderProducts(filteredGames);
    } else {
        gameListContainer.innerHTML = `<p class="error-message">No products found for "${searchTerm}".</p>`;
    }
}

function filterProducts() {
    let filteredProducts = [...allProducts];

    const selectedCategory = categoryFilter.value.toLowerCase();
    if (selectedCategory !== "all") {
        filteredProducts = filteredProducts.filter((game) =>
            game.genre.toLowerCase() === selectedCategory
        );
    }

    const selectedPrice = priceFilter.value;
    if (selectedPrice === "low-to-high") {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (selectedPrice === "high-to-low") {
        filteredProducts.sort((a, b) => b.price - a.price);
    }

    const selectedRelease = releaseFilter.value;
    if (selectedRelease === "newest") {
        filteredProducts.sort((a, b) => b.released - a.released);
    } else if (selectedRelease === "oldest") {
        filteredProducts.sort((a, b) => a.released - b.released);
    }

    renderProducts(filteredProducts);
}

function filterByGenre(selectedGenre) {
    const filteredProducts = allProducts.filter((game) =>
        game.genre.toLowerCase() === selectedGenre.toLowerCase()
    );
    categoryFilter.value = selectedGenre;
    renderProducts(filteredProducts);
}

function attachAddToCartEvents(products) {
    const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
    addToCartButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
            const productId = e.target.dataset.id;
            const product = products.find((p) => p.id === productId);

            if (product) {
                addToCart(product);
                showPopupMessage(`${product.title} has been added to your cart!`); 
            }
        });
    });
}

function addToCart(product) {
    if (!product) return; 

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = cart.find((item) => item.id === product.id);

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

    localStorage.setItem("cart", JSON.stringify(cart));
    showPopupMessage(`${product.title} has been added to your cart!`);
    updateCartCount(); 
}


document.addEventListener("DOMContentLoaded", async () => {
    allProducts = await fetchAllProducts();
    renderProducts(allProducts);
    updateCartCount();

    categoryFilter.addEventListener("change", filterProducts);
    priceFilter.addEventListener("change", filterProducts);
    releaseFilter.addEventListener("change", filterProducts);
    
    resetFiltersBtn.addEventListener("click", () => {
        categoryFilter.value = "all";
        priceFilter.value = "all";
        releaseFilter.value = "all";
        renderProducts(allProducts);
    });
});

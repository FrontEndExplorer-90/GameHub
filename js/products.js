const baseAPIUrl = "https://v2.api.noroff.dev/gamehub/";
const gameListContainer = document.querySelector(".game-list");
const categoryFilter = document.getElementById("category-filter");
const priceFilter = document.getElementById("price-filter");
const releaseFilter = document.getElementById("release-filter");
const resetFiltersBtn = document.getElementById("reset-filters");
const genreLinks = document.querySelectorAll("#genre-list a"); // Sidebar-sjangere

let allProducts = []; // Lagrer alle produkter for filtrering

// 🎯 Hent alle spill fra API
async function fetchAllProducts() {
    try {
        const response = await fetch(baseAPIUrl);
        if (!response.ok) throw new Error("Failed to fetch products");

        const jsonData = await response.json();
        return jsonData.data || []; // Spillene ligger i `data`
    } catch (error) {
        console.error("Error fetching products:", error);
        gameListContainer.innerHTML = `<p class="error-message">Failed to load products. Please try again later.</p>`;
        return [];
    }
}

// 🎯 Generer HTML for spill
function renderProducts(products) {
    gameListContainer.innerHTML = ""; // Tøm containeren

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
                <p>${product.onSale ? `<s>${product.price} $</s> ${product.discountedPrice} $` : `${product.price} $`}</p>
                <p>Release: ${product.released}</p>
                <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
            </div>
        `;
        gameListContainer.innerHTML += productHTML;
    });

    attachAddToCartEvents(products);
}

// 🎯 Hent produkter når siden laster
document.addEventListener("DOMContentLoaded", async () => {
    allProducts = await fetchAllProducts();
    renderProducts(allProducts);

    // 🔍 Hent lagret søkeord fra localStorage
    const storedSearchTerm = localStorage.getItem("searchTerm");

    if (storedSearchTerm) {
        console.log(`📥 Loaded search term: ${storedSearchTerm}`); // Debugging
        filterProductsBySearch(storedSearchTerm);
        localStorage.removeItem("searchTerm"); // Slett etter bruk
    }
});

// 🔍 Funksjon for å filtrere søk
function filterProductsBySearch(searchTerm) {
    const lowerCaseSearch = searchTerm.toLowerCase();

    const filteredGames = allProducts.filter(game =>
        game.title.toLowerCase().includes(lowerCaseSearch)
    );

    if (filteredGames.length === 1) {
        // 🔥 Hvis kun ett treff, gå direkte til produktets side
        window.location.href = `productpage.html?id=${filteredGames[0].id}`;
    } else if (filteredGames.length > 1) {
        // 🔥 Hvis flere treff, vis dem i produktlisten
        renderProducts(filteredGames);
    } else {
        // ❌ Ingen treff, vis feilmelding
        gameListContainer.innerHTML = `<p class="error-message">No products found for "${searchTerm}".</p>`;
    }
}


// 🎯 Filtrer produkter basert på valgte kriterier
function filterProducts() {
    let filteredProducts = [...allProducts];

    // 🎯 Filter etter kategori/sjanger (brukes sammen)
    const selectedCategory = categoryFilter.value.toLowerCase();
    if (selectedCategory !== "all") {
        filteredProducts = filteredProducts.filter(game =>
            game.genre.toLowerCase() === selectedCategory
        );
    }

    // 🎯 Sortering etter pris
    const selectedPrice = priceFilter.value;
    if (selectedPrice === "low-to-high") {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (selectedPrice === "high-to-low") {
        filteredProducts.sort((a, b) => b.price - a.price);
    }

    // 🎯 Sortering etter utgivelsesdato
    const selectedRelease = releaseFilter.value;
    if (selectedRelease === "newest") {
        filteredProducts.sort((a, b) => b.released - a.released); // Nyeste først
    } else if (selectedRelease === "oldest") {
        filteredProducts.sort((a, b) => a.released - b.released); // Eldste først
    }

    renderProducts(filteredProducts);
}

// 🎯 Håndter sjanger-klikk i sidebar
genreLinks.forEach(link => {
    link.addEventListener("click", (event) => {
        event.preventDefault();
        const selectedGenre = event.target.dataset.genre;
        filterByGenre(selectedGenre);
    });
});

// 🎯 Filtrer spill etter sjanger fra sidebar
function filterByGenre(selectedGenre) {
    const filteredProducts = allProducts.filter(game => 
        game.genre.toLowerCase() === selectedGenre.toLowerCase()
    );

    categoryFilter.value = selectedGenre; // Oppdater dropdown
    renderProducts(filteredProducts);
}

// 🎯 Håndter klikk på "Reset Filters"
resetFiltersBtn.addEventListener("click", () => {
    categoryFilter.value = "all";
    priceFilter.value = "all";
    releaseFilter.value = "all";
    renderProducts(allProducts);
});

// 🎯 Legg til event listeners på filtrene
categoryFilter.addEventListener("change", filterProducts);
priceFilter.addEventListener("change", filterProducts);
releaseFilter.addEventListener("change", filterProducts);

// 🎯 Legg til event listeners for søk
document.addEventListener("DOMContentLoaded", async () => {
    allProducts = await fetchAllProducts();
    renderProducts(allProducts);

    // 🎯 Sjekk om det finnes et lagret søk når products.html lastes
    const storedSearchTerm = localStorage.getItem("searchTerm");
    if (storedSearchTerm) {
        filterProductsBySearch(storedSearchTerm);
        localStorage.removeItem("searchTerm"); // Slett etter bruk
    }

    // 🎯 Hent valgt sjanger fra localStorage (hvis brukeren klikket fra sidebar)
    const selectedGenre = localStorage.getItem("selectedGenre");
    if (selectedGenre) {
        filterByGenre(selectedGenre);
        localStorage.removeItem("selectedGenre"); // Fjern etter bruk
    }
});

// 🎯 Legg til spill i handlekurven
function attachAddToCartEvents(products) {
    const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");

    addToCartButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
            const productId = e.target.dataset.id;
            const product = products.find((p) => p.id === productId);

            if (product) {
                addToCart(product);
                alert(`${product.title} has been added to your cart!`);
            }
        });
    });
}

// 🎯 Funksjon for å legge til spill i handlekurven
function addToCart(product) {
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

    localStorage.setItem("cart", JSON.stringify(cart)); // Oppdater localStorage
}


// ========== LOADING INDICATOR-FUNKSJONER ========== //
function showLoadingIndicator() {
    const loadingIndicator = document.getElementById("loading-indicator");
    if (loadingIndicator) {
        loadingIndicator.classList.remove("hidden");
    }
}

function hideLoadingIndicator() {
    const loadingIndicator = document.getElementById("loading-indicator");
    if (loadingIndicator) {
        loadingIndicator.classList.add("hidden");
    }
}


// ======= Header Navigation Links =======
document.addEventListener("DOMContentLoaded", () => {
    const myGameHubLink = document.getElementById("myGameHubLink");
    const loggedInUser = localStorage.getItem("loggedInUser");

    if (loggedInUser && myGameHubLink) {
        myGameHubLink.style.display = "inline-block"; 
    }
});

const navLinks = document.querySelectorAll('.nav a');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();  
        showLoadingIndicator(); 

        setTimeout(() => {
            window.location.href = link.href;
        }, 400);
    });
});


// ======= Search Bar Functionality =======
document.addEventListener("DOMContentLoaded", () => {
    const searchBar = document.getElementById("search-bar");

    if (searchBar) {
        searchBar.addEventListener("keypress", (event) => {
            if (event.key === "Enter") {
                event.preventDefault();
                const searchTerm = searchBar.value.trim().toLowerCase();
                
                if (searchTerm.length > 0) { 
                    localStorage.setItem("searchTerm", searchTerm);
                    showLoadingIndicator();
                    setTimeout(() => {
                        window.location.href = "products.html";
                    }, 400);
                }
            }
        });
    }
});


// ======= Footer Social Icons Hover Effect =======
const footerIcons = document.querySelectorAll('.footer-socials a img');
footerIcons.forEach(icon => {
    icon.addEventListener('mouseover', () => {
        icon.style.transform = 'scale(1.2)';
    });
    icon.addEventListener('mouseout', () => {
        icon.style.transform = 'scale(1)';
    });
});


// ======= Sidebar Toggle Functionality =======
document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.querySelector('.sidebar');
    const sidebarToggle = document.getElementById("sidebar-toggle");
    const sidebarLabel = document.querySelector('.sidebar-toggle-label');

    if (!sidebar || !sidebarToggle || !sidebarLabel) return; 

    sidebarLabel.addEventListener('click', (e) => {
        e.stopPropagation();
        sidebar.classList.toggle('active');
    });

    sidebar.addEventListener("click", (e) => {
        e.stopPropagation();
    });

    document.addEventListener("click", (e) => {
        if (!sidebar.contains(e.target) && !sidebarLabel.contains(e.target)) {
            sidebar.classList.remove("active");
        }
    });
});

// ======= Handle Genre Links in Sidebar =======
document.addEventListener("DOMContentLoaded", () => {
    const genreLinks = document.querySelectorAll("#genre-list a");

    genreLinks.forEach(link => {
        link.addEventListener("click", (event) => {
            event.preventDefault();

            const selectedGenre = link.dataset.genre;
            localStorage.setItem("selectedGenre", selectedGenre);

            showLoadingIndicator();
            setTimeout(() => {
                window.location.href = "products.html";
            }, 400);
        });
    });
});

// ======= Handle Cart Icon Click =======
const cartIcon = document.querySelector('.header-icons a[href="cart.html"]');
if (cartIcon) {
    cartIcon.addEventListener('click', (e) => {
        e.preventDefault();
        showLoadingIndicator(); 
        setTimeout(() => {
            window.location.href = 'cart.html';
        }, 400);
    });
}

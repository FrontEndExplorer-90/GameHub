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
const sidebar = document.querySelector('.sidebar');
const sidebarToggleLabel = document.querySelector('.sidebar-toggle-label');

if (sidebarToggleLabel) {
    sidebarToggleLabel.addEventListener('click', (e) => {
        e.stopPropagation(); 
        if (sidebar) {
            sidebar.classList.toggle('active'); 
        }
    });
}

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

const sidebarToggle = document.getElementById("sidebar-toggle");
if (sidebarToggle) {
    sidebarToggle.addEventListener("click", function () {
    
    });
}

document.addEventListener('click', (e) => {
    if (sidebar && sidebarToggleLabel) {
        if (!sidebar.contains(e.target) && !sidebarToggleLabel.contains(e.target)) {
            if (sidebar.classList.contains('active')) {
                sidebar.classList.remove('active'); 
            }
        }
    }
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

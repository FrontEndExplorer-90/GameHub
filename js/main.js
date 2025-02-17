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

    if (loggedInUser) {
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
    console.log("main.js is loaded!");

    const searchBar = document.getElementById("search-bar");

    if (searchBar) {
        console.log("🔍 Search bar found!");

        searchBar.addEventListener("keypress", (event) => {
            if (event.key === "Enter") {
                event.preventDefault();
                const searchTerm = searchBar.value.trim().toLowerCase();
                
                if (searchTerm.length > 0) { 
                    localStorage.setItem("searchTerm", searchTerm);
                    console.log(`🔍 Search term saved: ${searchTerm}`);
                    console.log("➡ Redirecting to products.html...");

                    // Vis indikator før vi forlater siden
                    showLoadingIndicator();
                    setTimeout(() => {
                        window.location.href = "products.html";
                    }, 400);

                } else {
                    console.log("❌ Empty search input, no action taken.");
                }
            }
        });
    } else {
        console.log("❌ Search bar NOT found!");
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

sidebarToggleLabel.addEventListener('click', (e) => {
    e.stopPropagation(); 
    sidebar.classList.toggle('active'); 
    console.log(`Hamburger clicked. Sidebar toggled: ${sidebar.classList.contains('active')}`);
});

document.addEventListener("DOMContentLoaded", () => {
    const genreLinks = document.querySelectorAll("#genre-list a");

    genreLinks.forEach(link => {
        link.addEventListener("click", (event) => {
            event.preventDefault();

            // Lagrer genre i localStorage
            const selectedGenre = link.dataset.genre;
            localStorage.setItem("selectedGenre", selectedGenre);

            // Vis spinner før vi laster products.html
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
        console.log("Hamburger clicked. Sidebar toggled:", sidebarToggle.checked);
    });
} else {
    console.error("Sidebar toggle element not found in DOM!");
}

document.addEventListener('click', (e) => {
    if (!sidebar.contains(e.target) && !sidebarToggleLabel.contains(e.target)) {
        if (sidebar.classList.contains('active')) {
            sidebar.classList.remove('active'); 
            console.log('Clicked outside, sidebar closed.');
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
} else {
    console.log("No cart icon or different href found!");
}

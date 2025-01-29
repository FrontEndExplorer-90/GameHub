// ======= Header Navigation Links =======
document.addEventListener("DOMContentLoaded", () => {
    const myGameHubLink = document.getElementById("myGameHubLink");
    const loggedInUser = localStorage.getItem("loggedInUser");

    if (loggedInUser) {
        myGameHubLink.style.display = "inline-block"; // Vis linken hvis bruker er logget inn
    }
});

const navLinks = document.querySelectorAll('.nav a');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (!href || href.startsWith('#')) {
            // Prevent navigation for empty or anchor links
            e.preventDefault();
            console.log(`Invalid or anchor link clicked: ${href}`);
        } else {
            console.log(`Navigating to: ${href}`);
        }
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
                
                if (searchTerm.length > 0) { // Sjekk at søkefeltet ikke er tomt
                    localStorage.setItem("searchTerm", searchTerm);
                    console.log(`🔍 Search term saved: ${searchTerm}`);
                    console.log("➡ Redirecting to products.html...");
                    window.location.href = "products.html";
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
    e.stopPropagation(); // Forhindre at klikket bobler opp og registreres som "klikk utenfor"
    sidebar.classList.toggle('active'); // Toggle 'active'-klassen
    console.log(`Hamburger clicked. Sidebar toggled: ${sidebar.classList.contains('active')}`);
});

document.addEventListener("DOMContentLoaded", () => {
    const genreLinks = document.querySelectorAll("#genre-list a");

    genreLinks.forEach(link => {
        link.addEventListener("click", (event) => {
            event.preventDefault(); // Hindrer siden fra å laste på nytt

            const selectedGenre = event.target.dataset.genre; // Hent sjanger
            localStorage.setItem("selectedGenre", selectedGenre); // Lagre i LocalStorage

            window.location.href = "products.html"; // Send til produktsiden
        });
    });
});


// Når du klikker utenfor sidebaren
document.addEventListener('click', (e) => {
    // Sjekk om klikket er utenfor både sidebar og hamburgermeny
    if (!sidebar.contains(e.target) && !sidebarToggleLabel.contains(e.target)) {
        if (sidebar.classList.contains('active')) {
            sidebar.classList.remove('active'); // Fjern 'active'-klassen
            console.log('Clicked outside, sidebar closed.');
        }
    }
});

// ======= Handle Cart Icon Click =======
const cartIcon = document.querySelector('.header-icons a[href="empty-cart.html"]');
if (cartIcon) {
    cartIcon.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default anchor behavior
        window.location.href = 'cart.html'; // Redirect to the cart page
    });
}

// ======= Debugging Utility (Optional) =======
console.log('Header, footer, and sidebar functionality initialized.');

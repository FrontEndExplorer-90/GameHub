// ======= Header Navigation Links =======
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

// ======= Search Bar Placeholder =======
const searchBar = document.querySelector('.search-bar');
if (searchBar) {
    searchBar.addEventListener('focus', () => {
        searchBar.setAttribute('placeholder', '');
    });
    searchBar.addEventListener('blur', () => {
        searchBar.setAttribute('placeholder', 'Search for Games');
    });
}

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

// Når hamburgermenyen klikkes
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

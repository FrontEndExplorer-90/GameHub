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
        const href = link.getAttribute('href');
        if (!href || href.startsWith('#')) {
           
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
                
                if (searchTerm.length > 0) { 
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
    e.stopPropagation(); 
    sidebar.classList.toggle('active'); 
    console.log(`Hamburger clicked. Sidebar toggled: ${sidebar.classList.contains('active')}`);
});

document.addEventListener("DOMContentLoaded", () => {
    const genreLinks = document.querySelectorAll("#genre-list a");

    genreLinks.forEach(link => {
        link.addEventListener("click", (event) => {
            event.preventDefault(); 

            const selectedGenre = event.target.dataset.genre; 
            localStorage.setItem("selectedGenre", selectedGenre); 

            window.location.href = "products.html"; 
        });
    });
});

document.addEventListener('click', (e) => {
    
    if (!sidebar.contains(e.target) && !sidebarToggleLabel.contains(e.target)) {
        if (sidebar.classList.contains('active')) {
            sidebar.classList.remove('active'); 
            console.log('Clicked outside, sidebar closed.');
        }
    }
});

// ======= Handle Cart Icon Click =======
const cartIcon = document.querySelector('.header-icons a[href="empty-cart.html"]');
if (cartIcon) {
    cartIcon.addEventListener('click', (e) => {
        e.preventDefault(); 
        window.location.href = 'cart.html'; 
    });
}



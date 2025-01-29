// ======= Sidebar Toggle =======
const sidebar = document.querySelector('.sidebar');
document.querySelector('.sidebar-toggle-label').addEventListener('click', () => {
    sidebar.classList.toggle('active');
});

// ======= Carousel Functionality =======
const slides = document.querySelectorAll('.carousel-slide');
let currentIndex = 0;

function showSlide(index) {
    const slidesContainer = document.querySelector('.carousel-slides');
    slidesContainer.style.transform = `translateX(-${index * 100}%)`;
    currentIndex = index;
}

document.querySelector('.carousel-next').addEventListener('click', () => {
    showSlide((currentIndex + 1) % slides.length);
});

document.querySelector('.carousel-prev').addEventListener('click', () => {
    showSlide((currentIndex - 1 + slides.length) % slides.length);
});

setInterval(() => {
    showSlide((currentIndex + 1) % slides.length);
}, 5000);

// ====== Most Wanted Section ======
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed.'); // Debugging-logg

    const shopLink = document.querySelector('.shop-link'); // Velg "SHOP HERE"-lenken

    // Cyberpunk-produktets ID fra API
    const cyberpunkProductId = 'cac3b2cd-1611-4007-9883-3adf6f74948f';

    // Sett riktig URL til produktet
    const productPageUrl = `productpage.html?id=${cyberpunkProductId}`;
    shopLink.setAttribute('href', productPageUrl);

    console.log('SHOP HERE link updated:', productPageUrl); // Debugging-logg
});

if (shopLink) {
    shopLink.setAttribute('href', productPageUrl);
    console.log('SHOP HERE link successfully updated to:', productPageUrl);
} else {
    console.error('SHOP HERE link not found in the DOM.');
}


// ======= Newsletter Popup =======
const popup = document.querySelector('.newsletter-popup');
const popupTrigger = document.querySelector('.popup-trigger');
const closeButton = document.querySelector('.close-button');

// Open popup
popupTrigger.addEventListener('click', () => {
    popup.style.display = 'block';
});

// Close popup
closeButton.addEventListener('click', () => {
    popup.style.display = 'none';
});

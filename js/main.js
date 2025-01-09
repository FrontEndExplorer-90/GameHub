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

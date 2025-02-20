document.addEventListener("DOMContentLoaded", () => {
    // ========== CAROUSEL ==========  
    const slides = document.querySelectorAll(".carousel-slide");
    const slidesContainer = document.querySelector(".carousel-slides");
    const nextButton = document.querySelector(".carousel-next");
    const prevButton = document.querySelector(".carousel-prev");
    let currentIndex = 0;

    if (slides.length > 0 && slidesContainer) {
        function showSlide(index) {
            slidesContainer.style.transform = `translateX(-${index * 100}%)`;
            currentIndex = index;
        }

        if (nextButton) {
            nextButton.addEventListener("click", () => {
                showSlide((currentIndex + 1) % slides.length);
            });
        }

        if (prevButton) {
            prevButton.addEventListener("click", () => {
                showSlide((currentIndex - 1 + slides.length) % slides.length);
            });
        }

        setInterval(() => {
            showSlide((currentIndex + 1) % slides.length);
        }, 5000);
    }

    // ========== SHOP LINK («Most Wanted»/Cyberpunk) ==========
    const shopLink = document.getElementById("shop-link");
    if (shopLink) {
        const cyberpunkProductId = "cac3b2cd-1611-4007-9883-3adf6f74948f";
        shopLink.setAttribute("href", `productpage.html?id=${cyberpunkProductId}`);
    }

    // ========== NEWSLETTER POPUP ==========
    const popup = document.querySelector(".newsletter-popup");
    const popupTrigger = document.querySelector(".popup-trigger");
    const closeButton = document.querySelector(".close-button");
    const emailInput = document.getElementById("newsletter-email");
    const signUpButton = document.getElementById("newsletter-signup-btn");

    function togglePopup(show) {
        if (popup) {
            popup.classList.toggle("active", show);
        }
    }

    if (popupTrigger) {
        popupTrigger.addEventListener("click", () => togglePopup(true));
    }

    if (closeButton) {
        closeButton.addEventListener("click", () => togglePopup(false));
    }

    if (signUpButton && emailInput) {
        signUpButton.addEventListener("click", (event) => {
            event.preventDefault(); 

            const email = emailInput.value.trim();
            if (email === "") {
                alert("❌ Please enter a valid email address.");
                return;
            }

            localStorage.setItem("subscribedEmail", email);
            window.location.href = "newsletter.html";
        });
    }
});

document.addEventListener("DOMContentLoaded", () => {
    function setupCloseButton() {
        const popup = document.querySelector(".newsletter-popup");
        const closeButton = document.querySelector(".close-button");

        if (!popup || !closeButton) {
            setTimeout(setupCloseButton, 500); 
            return;
        }

        closeButton.addEventListener("click", () => {
            popup.classList.add("hidden");
        });
    }

    setupCloseButton(); 
});

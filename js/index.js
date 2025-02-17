document.addEventListener("DOMContentLoaded", () => {
    // ========== CAROUSEL ==========
    const slides = document.querySelectorAll(".carousel-slide");
    let currentIndex = 0;
  
    function showSlide(index) {
        const slidesContainer = document.querySelector(".carousel-slides");
        slidesContainer.style.transform = `translateX(-${index * 100}%)`;
        currentIndex = index;
    }
  
    const nextButton = document.querySelector(".carousel-next");
    const prevButton = document.querySelector(".carousel-prev");
  
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
  
    // ========== SHOP LINK («Most Wanted»/Cyberpunk) ==========
    const shopLink = document.getElementById("shop-link");
    if (shopLink) {
        const cyberpunkProductId = "cac3b2cd-1611-4007-9883-3adf6f74948f";
        const productPageUrl = `productpage.html?id=${cyberpunkProductId}`;
        shopLink.setAttribute("href", productPageUrl);
    }
  
    // ========== NEWSLETTER POPUP ==========
    const popup = document.querySelector(".newsletter-popup");
    const popupTrigger = document.querySelector(".popup-trigger");
    const closeButton = document.querySelector(".close-button");
    const emailInput = document.getElementById("newsletter-email");
    const signUpButton = document.getElementById("newsletter-signup-btn");
  
    if (popupTrigger) {
        popupTrigger.addEventListener("click", () => {
            if (popup) {
                popup.style.display = "block";
            }
        });
    }
  
    if (closeButton) {
        closeButton.addEventListener("click", () => {
            if (popup) {
                popup.style.display = "none";
            }
        });
    }
  
    if (signUpButton) {
        signUpButton.addEventListener("click", (event) => {
            event.preventDefault();
  
            const email = emailInput ? emailInput.value.trim() : "";
            if (email === "") {
                alert("Please enter a valid email address.");
                return;
            }
  
            localStorage.setItem("subscribedEmail", email);
  
            window.location.href = "newsletter.html";
        });
    }
  });
  
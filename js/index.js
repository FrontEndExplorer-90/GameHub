document.addEventListener("DOMContentLoaded", () => {
  console.log("📌 Index JS loaded");

  // ========== CAROUSEL ==========
  const slides = document.querySelectorAll(".carousel-slide");
  let currentIndex = 0;

  function showSlide(index) {
      const slidesContainer = document.querySelector(".carousel-slides");
      slidesContainer.style.transform = `translateX(-${index * 100}%)`;
      currentIndex = index;
  }

  
  document.querySelector(".carousel-next").addEventListener("click", () => {
      showSlide((currentIndex + 1) % slides.length);
  });

  
  document.querySelector(".carousel-prev").addEventListener("click", () => {
      showSlide((currentIndex - 1 + slides.length) % slides.length);
  });

  
  setInterval(() => {
      showSlide((currentIndex + 1) % slides.length);
  }, 5000);

  // ========== SHOP LINK («Most Wanted»/Cyberpunk) ==========
  const shopLink = document.getElementById("shop-link");
  if (shopLink) {
      const cyberpunkProductId = "cac3b2cd-1611-4007-9883-3adf6f74948f";
      const productPageUrl = `productpage.html?id=${cyberpunkProductId}`;
      shopLink.setAttribute("href", productPageUrl);
      console.log("SHOP HERE link updated:", productPageUrl);
  } else {
      console.error("❌ shopLink element not found in DOM.");
  }

  // ========== NEWSLETTER POPUP ==========
  const popup = document.querySelector(".newsletter-popup");
  const popupTrigger = document.querySelector(".popup-trigger");
  const closeButton = document.querySelector(".close-button");
  const emailInput = document.getElementById("newsletter-email");
  const signUpButton = document.getElementById("newsletter-signup-btn");


  if (popupTrigger) {
      popupTrigger.addEventListener("click", () => {
          popup.style.display = "block";
          console.log("✅ Newsletter pop-up opened");
      });
  }

  if (closeButton) {
      closeButton.addEventListener("click", () => {
          popup.style.display = "none";
          console.log("✅ Newsletter pop-up closed");
      });
  }

  
  if (signUpButton) {
      signUpButton.addEventListener("click", (event) => {
          event.preventDefault(); 

          const email = emailInput.value.trim();
          if (email === "") {
              alert("❌ Please enter a valid email address.");
              return;
          }

          console.log(`📩 Signing up with email: ${email}`);
          localStorage.setItem("subscribedEmail", email);

          
          window.location.href = "newsletter.html";
      });
  }
});

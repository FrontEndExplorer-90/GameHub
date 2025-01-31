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

  // Neste-knapp
  document.querySelector(".carousel-next").addEventListener("click", () => {
      showSlide((currentIndex + 1) % slides.length);
  });

  // Forrige-knapp
  document.querySelector(".carousel-prev").addEventListener("click", () => {
      showSlide((currentIndex - 1 + slides.length) % slides.length);
  });

  // Automatisk slide hvert 5. sekund
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

  // 🎯 Åpne pop-up
  if (popupTrigger) {
      popupTrigger.addEventListener("click", () => {
          popup.style.display = "block";
          console.log("✅ Newsletter pop-up opened");
      });
  }

  // 🎯 Lukk pop-up
  if (closeButton) {
      closeButton.addEventListener("click", () => {
          popup.style.display = "none";
          console.log("✅ Newsletter pop-up closed");
      });
  }

  // 🎯 Håndter sign-up når knappen trykkes
  if (signUpButton) {
      signUpButton.addEventListener("click", (event) => {
          event.preventDefault(); // Hindrer siden fra å laste på nytt

          const email = emailInput.value.trim();
          if (email === "") {
              alert("❌ Please enter a valid email address.");
              return;
          }

          console.log(`📩 Signing up with email: ${email}`);
          localStorage.setItem("subscribedEmail", email);

          // 🎯 Send brukeren til `newsletter.html`
          window.location.href = "newsletter.html";
      });
  }
});

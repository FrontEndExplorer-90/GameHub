document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded and parsed.");
  
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
    if (!shopLink) {
      console.error("shopLink element not found in DOM.");
      return; // Avbryt resten av koden hvis denne mangler
    }
  
    // Cyberpunk-produktets ID
    const cyberpunkProductId = "cac3b2cd-1611-4007-9883-3adf6f74948f";
    const productPageUrl = `productpage.html?id=${cyberpunkProductId}`;
  
    // Oppdater "SHOP HERE"-lenken
    shopLink.setAttribute("href", productPageUrl);
    console.log("SHOP HERE link updated:", productPageUrl);
  
    // Hvis du vil overstyre klikket med en annen handling
    shopLink.addEventListener("click", (evt) => {
      console.log("Shop link clicked! Redirecting to products page...");
      // window.location.href = "products.html";
      // (Fjern evt. kommentaren hvis du faktisk vil til "products.html")
    });
  
    // ========== NEWSLETTER POPUP ==========
    const popup = document.querySelector(".newsletter-popup");
    const popupTrigger = document.querySelector(".popup-trigger");
    const closeButton = document.querySelector(".close-button");
  
    // Åpne popup
    popupTrigger.addEventListener("click", () => {
      popup.style.display = "block";
    });
  
    // Lukk popup
    closeButton.addEventListener("click", () => {
      popup.style.display = "none";
    });
  });
  
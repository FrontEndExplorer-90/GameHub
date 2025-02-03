document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("newsletter-form");
    const message = document.getElementById("subscription-message");

    form.addEventListener("submit", (event) => {
        event.preventDefault(); 

        const emailInput = document.getElementById("newsletter-full-email");
        if (emailInput.value.trim() !== "") {
           
            message.style.display = "block";

            
            localStorage.setItem("subscribedEmail", emailInput.value.trim());

          
            emailInput.value = "";
        } else {
            alert("Please enter a valid email address.");
        }
    });
});


document.addEventListener("DOMContentLoaded", () => {
    const savedEmail = localStorage.getItem("subscribedEmail");

    if (savedEmail) {
        document.getElementById("newsletter-full-email").value = savedEmail;
    }
});
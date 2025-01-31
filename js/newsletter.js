// Select the newsletter form
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("newsletter-form");
    const message = document.getElementById("subscription-message");

    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Stopper standard form submission

        const emailInput = document.getElementById("newsletter-full-email");
        if (emailInput.value.trim() !== "") {
            // Viser meldingen når brukeren trykker "Subscribe"
            message.style.display = "block";

            // Lagrer eposten i localStorage (valgfritt)
            localStorage.setItem("subscribedEmail", emailInput.value.trim());

            // Tømmer inputfeltet
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
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("newsletter-form");
    const message = document.getElementById("subscription-message");
    const emailInput = document.getElementById("newsletter-full-email");

    let subscribedEmails = JSON.parse(localStorage.getItem("subscribedEmails")) || [];

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const email = emailInput.value.trim();

        if (!email) {
            alert("Please enter a valid email address.");
            return;
        }

        const emailExists = subscribedEmails.some(e => e.toLowerCase() === email.toLowerCase());

        if (emailExists) {
            alert("This email is already registered.");
        } else {
            subscribedEmails.push(email);
            localStorage.setItem("subscribedEmails", JSON.stringify(subscribedEmails));
            message.style.display = "block";
            emailInput.value = "";
        }
    });
});

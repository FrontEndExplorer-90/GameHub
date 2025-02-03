document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("membership-form");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const username = document.getElementById("username").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirm-password").value;

        if (!username || !email || !password || !confirmPassword) {
            alert("Please fill in all fields.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        const user = {
            username,
            email,
            password
        };

     
        localStorage.setItem("gamehubUser", JSON.stringify(user));

        alert("Registration successful! You can now log in.");
        window.location.href = "login.html";
    });
});

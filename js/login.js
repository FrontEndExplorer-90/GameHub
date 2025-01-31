document.addEventListener("DOMContentLoaded", () => {
    console.log("📌 Login.js loaded");

    const loginForm = document.getElementById("login-form");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");

    if (!loginForm || !usernameInput || !passwordInput) {
        console.error("🚨 Login elements not found in the DOM!");
        return;
    }

    // 🎯 Dummy brukere (kan byttes med backend senere)
    const users = [
        { username: "gamer123", password: "password123" },
        { username: "test", password: "1234" }
    ];

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const username = usernameInput.value.trim();
        const password = passwordInput.value;

        if (!username || !password) {
            alert("Please enter both username and password.");
            return;
        }

        const user = users.find(user => 
            user.username.toLowerCase() === username.toLowerCase() && 
            user.password === password
        );

        if (user) {
            console.log("✅ Login successful!");

            // 🎯 Lagre bruker i localStorage
            localStorage.setItem("loggedInUser", JSON.stringify({ username: user.username }));

            // 🎯 Omdiriger til community-siden
            window.location.href = "community.html";
        } else {
            alert("Invalid username or password. Please try again.");
        }
    });

    console.log("✅ Login.js successfully initialized.");
});

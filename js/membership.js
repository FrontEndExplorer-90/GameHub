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

        let users = JSON.parse(localStorage.getItem("gamehubUsers")) || [];

        const existingUser = users.find(
            (user) => user.username.toLowerCase() === username.toLowerCase()
        );
        if (existingUser) {
            alert("Username already exists. Please choose a different username.");
            return;
        }

        const newUser = {
            username: username,
            email: email,
            password: password
        };

        users.push(newUser);
        localStorage.setItem("gamehubUsers", JSON.stringify(users));

        alert("Registration successful! You can now log in.");
        window.location.href = "../pages/login.html";
    });
});

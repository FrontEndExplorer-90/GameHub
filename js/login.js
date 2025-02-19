document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");

    if (!loginForm || !usernameInput || !passwordInput) {
        return;
    }

    let users = JSON.parse(localStorage.getItem("gamehubUsers")) || [];

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const username = usernameInput.value.trim();
        const password = passwordInput.value;

        if (!username || !password) {
            alert("Please enter both username and password.");
            return;
        }

        const user = users.find(u => 
            u.username.toLowerCase() === username.toLowerCase() &&
            u.password === password
        );

        if (user) {
            localStorage.setItem("loggedInUser", JSON.stringify({ username: user.username }));
            window.location.href = "community.html";
        } else {
            alert("Invalid username or password. Please try again.");
        }
    });
});

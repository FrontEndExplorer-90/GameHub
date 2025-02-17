document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");

    if (!loginForm || !usernameInput || !passwordInput) {

        return;
    }

    const users = [
        { username: "gamer123", password: "password123" },
        { username: "test",     password: "1234" }
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

            localStorage.setItem("loggedInUser", JSON.stringify({ username: user.username }));
            
            window.location.href = "community.html";
        } else {
            alert("Invalid username or password. Please try again.");
        }
    });
});


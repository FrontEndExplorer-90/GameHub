// Select the login form and input fields
const loginForm = document.getElementById('login-form');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');

// Mock user data (you can replace this with server-side authentication)
const users = [
    { username: 'gamer123', password: 'password123' },
    { username: 'test', password: '1234' }
];

// Form submission handler
loginForm.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form from reloading the page

    const username = usernameInput.value.trim();
    const password = passwordInput.value;

    // Validate the form fields
    if (!username || !password) {
        alert('Please fill in both fields!');
        return;
    }

    // Check if the user exists in the mock data
    const userExists = users.some(
        (user) =>
            user.username.toLowerCase() === username.toLowerCase() && // Case-insensitive username
            user.password === password
    );

    if (userExists) {
        // ✅ Lagre brukernavn i localStorage for bruk i community.html
        localStorage.setItem('loggedInUser', username);

        // ✅ Simulate login success
        alert(`Login successful! Welcome, ${username}. Redirecting...`);
        window.location.href = 'community.html'; // Redirect til community-siden
    } else {
        // ❌ Show error message for invalid credentials
        alert('Invalid username or password. Please try again.');
        passwordInput.value = ''; // Clear the password field
    }
});

// Forgot password link handler
document.getElementById('forgot-password-link').addEventListener('click', function (e) {
    e.preventDefault();
    alert('Forgot Password? Contact support or reset your password!');
});

// Password toggle visibility
const togglePassword = document.getElementById('toggle-password');
togglePassword.addEventListener('click', () => {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    togglePassword.textContent = type === 'password' ? 'Show' : 'Hide';
});

document.addEventListener('DOMContentLoaded', () => {
    // Enable or disable editing for username and email
    document.querySelector('.edit-btn').addEventListener('click', () => {
        const usernameInput = document.getElementById('username');
        const emailInput = document.getElementById('email');

        if (usernameInput.disabled && emailInput.disabled) {
            usernameInput.disabled = false;
            emailInput.disabled = false;
        } else {
            usernameInput.disabled = true;
            emailInput.disabled = true;
            alert('Profile updated successfully!');
        }
    });

    // Update Password
    document.querySelector('.password-btn').addEventListener('click', () => {
        const newPassword = prompt('Enter your new password:');
        if (newPassword) {
            alert('Password updated successfully!');
        }
    });

    // Dynamic Theme Switching
    document.getElementById('theme').addEventListener('change', (event) => {
        const selectedTheme = event.target.value;

        if (selectedTheme === 'light') {
            document.body.style.backgroundColor = '#fff';
            document.body.style.color = '#000';
        } else {
            document.body.style.backgroundColor = '#000';
            document.body.style.color = '#fff';
        }
    });

    // Delete Account Confirmation
    document.querySelector('.delete-account-btn').addEventListener('click', () => {
        const confirmation = confirm('Are you sure you want to delete your account? This action cannot be undone.');
        if (confirmation) {
            alert('Account deleted successfully.');
        }
    });
});

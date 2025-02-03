document.addEventListener('DOMContentLoaded', () => {
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const profileImg = document.getElementById('profile-img');
    const profileImgUpload = document.getElementById('profile-img-upload');

  
    const savedUsername = localStorage.getItem("username");
    const savedEmail = localStorage.getItem("email");
    const savedProfileImg = localStorage.getItem("profileImage");

    if (savedUsername) usernameInput.value = savedUsername;
    if (savedEmail) emailInput.value = savedEmail;
    if (savedProfileImg) profileImg.src = savedProfileImg;


    document.querySelector('.edit-btn').addEventListener('click', () => {
        if (usernameInput.disabled && emailInput.disabled) {
            usernameInput.disabled = false;
            emailInput.disabled = false;
        } else {
            usernameInput.disabled = true;
            emailInput.disabled = true;
            localStorage.setItem("username", usernameInput.value);
            localStorage.setItem("email", emailInput.value);
            alert('Profile updated successfully!');
        }
    });

  
    document.querySelector('.password-btn').addEventListener('click', () => {
        const newPassword = prompt('Enter your new password:');
        if (newPassword) {
            alert('Password updated successfully!');
        }
    });

 
    profileImgUpload.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                profileImg.src = e.target.result;
                localStorage.setItem("profileImage", e.target.result);
            };
            reader.readAsDataURL(file);
        }
    });

 
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

  
    document.querySelector('.delete-account-btn').addEventListener('click', () => {
        const confirmation = confirm('Are you sure you want to delete your account? This action cannot be undone.');
        if (confirmation) {
            localStorage.clear();
            alert('Account deleted successfully.');
        }
    });
});


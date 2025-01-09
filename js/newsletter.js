// Select the newsletter form
const newsletterForm = document.getElementById('newsletter-form');

// Handle form submission
newsletterForm.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent default form submission

    const email = document.getElementById('email').value.trim();

    if (email) {
        alert('Thank you for subscribing!');
        newsletterForm.reset(); // Clear the form
    } else {
        alert('Please enter a valid email address.');
    }
});

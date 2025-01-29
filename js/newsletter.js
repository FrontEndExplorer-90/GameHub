// Select the newsletter form
const newsletterForm = document.getElementById('newsletter-form');

newsletterForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();

    if (email) {
        alert(`Thank you, ${email}! You have successfully subscribed to Game Hub's newsletter.`);
        newsletterForm.reset();
    } else {
        alert('Please provide a valid email address.');
    }
});

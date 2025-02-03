// ======= Sidebar Toggle =======
const sidebar = document.querySelector('.sidebar');
document.querySelector('.sidebar-toggle-label').addEventListener('click', () => {
    sidebar.classList.toggle('active');
});

// ======= Smooth Scroll to Sections =======
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1); 
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ======= Collapsible Sections =======
const collapsibleSections = document.querySelectorAll('.collapsible-section h2');
collapsibleSections.forEach(header => {
    header.addEventListener('click', () => {
        const content = header.nextElementSibling; 
        content.classList.toggle('collapsed'); 
    });
});

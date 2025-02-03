document.addEventListener('DOMContentLoaded', () => {
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach((header) => {
        header.addEventListener('click', () => {
            const accordionItem = header.parentElement;
            const accordionContent = accordionItem.querySelector('.accordion-content');

           
            accordionItem.classList.toggle('active');

          
            accordionHeaders.forEach((otherHeader) => {
                if (otherHeader !== header) {
                    const otherItem = otherHeader.parentElement;
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.accordion-content').style.maxHeight = null;
                }
            });

            if (accordionItem.classList.contains('active')) {
                accordionContent.style.maxHeight = accordionContent.scrollHeight + "px";
            } else {
                accordionContent.style.maxHeight = null;
            }
        });
    });
});

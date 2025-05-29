document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const orderSummary = document.getElementById('order-summary');

    if (cart.length === 0) {
        orderSummary.innerHTML = `<p>No order details available.</p>`;
        return;
    }

    let total = 0;
    const itemsHTML = cart.map(item => {
        total += item.price;
        return `
            <li>
                ${item.title} - $${item.price.toFixed(2)}
            </li>`;
    }).join('');

    const orderID = `GH-${Math.floor(100000 + Math.random() * 900000)}`;

    orderSummary.innerHTML = `
        <h2>Order Summary</h2>
        <ul>${itemsHTML}</ul>
        <p><strong>Total:</strong> $${total.toFixed(2)}</p>
        <p><strong>Order ID:</strong> ${orderID}</p>
    `;

    
    localStorage.removeItem('cart');
});

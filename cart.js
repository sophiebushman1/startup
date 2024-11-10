// cart.js
document.addEventListener('DOMContentLoaded', () => {
    const cartItemsDiv = document.getElementById('cart-items');
    const cartTotalDiv = document.getElementById('cart-total');

    // Simulate fetching cart data (could be from localStorage or API)
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function updateCart() {
        if (cart.length === 0) {
            cartItemsDiv.innerHTML = '<p>Your cart is empty.</p>';
            cartTotalDiv.innerHTML = '<h4>Total: $0.00</h4>';
        } else {
            let total = 0;
            cartItemsDiv.innerHTML = cart.map(item => {
                total += item.price * item.quantity;
                return `<p>${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}</p>`;
            }).join('');
            cartTotalDiv.innerHTML = `<h4>Total: $${total.toFixed(2)}</h4>`;
        }
    }

    updateCart();
});

document.addEventListener('DOMContentLoaded', function () {
    // Retrieve cart count from localStorage
    const cartCount = localStorage.getItem('cartCount') || 0;
    const cartIcons = document.querySelectorAll('#cartIcon');
    // Update the cart icon with the retrieved count
    cartIcons.forEach(icon => {
        icon.textContent = cartCount;
      });
});
function filterProducts(event) {
    event.preventDefault();
    var searchInput = document.getElementById('searchInput');
     products = document.querySelectorAll('product');

    products.forEach(function (product) {
        const productName = product.querySelector('p.title').textContent;
        if (productName.toLowerCase().includes(searchInput.value.toLowerCase())) {
            product.classList.remove('hide');
        } else {
            product.classList.add('hide');
        }
    });
    window.location.href = "shop.html";
}



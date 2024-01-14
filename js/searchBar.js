

function filterProducts(event) {
    event.preventDefault();
    
    var searchInput = document.getElementById('searchInput');
    var searchTerm = searchInput.value.trim().toLowerCase();

    // Redirect to the target page with the search query as a parameter
    window.location.href = "shop.html?search=" + encodeURIComponent(searchTerm);
}




document.addEventListener('DOMContentLoaded', function () {
    // Retrieve the search query parameter from the URL
    var searchParams = new URLSearchParams(window.location.search);
    var searchTerm = searchParams.get('search');

    if (searchTerm) {
        var products = document.querySelectorAll('.shop__container__products__list__product');
        products.forEach(function (product) {
            const productName = product.querySelector('p.title').textContent;
            
            if (productName.toLowerCase().includes(searchTerm)) {
                product.classList.remove('hide');
            } else {
                product.classList.add('hide');
            }
        });
    }
});



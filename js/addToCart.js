let addProductToCart = document.getElementById('addProductToCart');

document.addEventListener('DOMContentLoaded', function () {
    addProductToCart.addEventListener('click', ($event) => {
        $event.preventDefault();
        // Selecting the closest product container
        const product = addProductToCart.closest('.productPage__product');

        const productId = product.querySelector('.productPage__product__id').textContent;
        const productTitle = product.querySelector('.productPage__product__title').textContent;
        const productPriceUnparsed = product.querySelector('.productPage__product__price').textContent;
        const productPrice = parseFloat(productPriceUnparsed);
        const firstCarouselImage = document.querySelector('.productPage__container__imgContainer__img img');
        const productQuantityUnparsed = document.querySelector('.productPage__product__quantity').value;
        const productQuantity = parseFloat(productQuantityUnparsed);
        const productImgSrc = firstCarouselImage ? firstCarouselImage.src : '';
        // Retrieve existing cart state from localStorage
        let existingCartProducts = JSON.parse(localStorage.getItem('cartProducts')) || [];

        // Update cart state with the new product
        existingCartProducts.push({
            id: productId,
            title: productTitle,
            price: productPrice,
            imgSrc: productImgSrc,
            quantity: productQuantity,
            totalCost: productPrice * productQuantity
        });
        updateCartCount(existingCartProducts);
        // Store the updated cart state back in localStorage
        localStorage.setItem('cartProducts', JSON.stringify(existingCartProducts));
        location.reload();
    });
});

function updateCartCount(products) {
    const totalCount = products.reduce((sum, product) => sum + parseInt(product.quantity), 0);
    localStorage.setItem('cartCount', totalCount.toString());
    // Calculate and store the total cost
    const totalCost = products.reduce((sum, product) => sum + parseInt(product.totalCost), 0);
    localStorage.setItem('cartTotalCost', totalCost.toString());
}

    


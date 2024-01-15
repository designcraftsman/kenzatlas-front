let cartProducts = [];
const addProductToCart = document.getElementById('addProductToCart');


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
        const productQuantity = document.querySelector('.productPage__product__quantity').value;
        const productImgSrc = firstCarouselImage ? firstCarouselImage.src : '';
        

        let addProduct = document.createElement('div');
        addProduct.classList.add('row', 'mt-3', 'align-items-center', 'cartProducts__product');

        let idCol = document.createElement('span');
        idCol.classList.add('d-none');
        idCol.textContent = productId;
        addProduct.appendChild(idCol);

        let imgCol = document.createElement('div');
        imgCol.classList.add('col-lg-1', 'col-2');
        let img = document.createElement('img');
        img.classList.add('w-100');
        img.src = productImgSrc;
        imgCol.appendChild(img);
        addProduct.appendChild(imgCol);

        let titleCol = document.createElement('div');
        titleCol.classList.add('col-lg-3', 'col-2');
        titleCol.textContent = productTitle;
        addProduct.appendChild(titleCol);

        let priceCol = document.createElement('div');
        priceCol.classList.add('col-3', 'm-auto');
        let price = document.createElement('span');
        price.classList.add('fs-5', 'fw-normal');
        price.textContent = productPrice + "dh";
        priceCol.appendChild(price);
        addProduct.appendChild(priceCol);

        let quantityCol = document.createElement('div');
        quantityCol.classList.add('col-3', 'm-auto');
        let quantityInput = document.createElement('input');
        quantityInput.type = 'number';
        quantityInput.min = '0';
        quantityInput.max = '10';
        quantityInput.value = productQuantity;
        quantityCol.appendChild(quantityInput);
        addProduct.appendChild(quantityCol);

        cartProducts.push(addProduct);

        // Retrieve existing cart state from sessionStorage
        const existingCartProducts = JSON.parse(sessionStorage.getItem('cartProducts')) || [];
        // Update cart state with the new product
        existingCartProducts.push({
            id: productId,
            title: productTitle,
            price: productPrice,
            imgSrc: productImgSrc,
            quantity: productQuantity 
        });

        // Store the updated cart state back in sessionStorage
        sessionStorage.setItem('cartProducts', JSON.stringify(existingCartProducts));
        localStorage.setItem('cartCount', cartProducts.length);
    });
});

    


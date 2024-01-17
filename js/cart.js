document.addEventListener('DOMContentLoaded', function () {
    // Retrieve cart count from localStorage
    const cartCount = localStorage.getItem('cartCount') || 0;
    const cartIcons = document.querySelectorAll('#cartIcon');
    // Update the cart icon with the retrieved count
    cartIcons.forEach(icon => {
        icon.textContent = cartCount;
      });
});



document.addEventListener('DOMContentLoaded', function () {

  // Retrieve cart information from localStorage
  const cartProducts = JSON.parse(localStorage.getItem('cartProducts')) || [];

  // Dynamically populate the cart container
  const cartContainer = document.querySelector('.cartProducts');

  cartProducts.forEach((product, index) => {
      // Create and append elements for each product in the cart
      const productElement = document.createElement('div');
      productElement.classList.add('row', 'mt-3', 'align-items-center', 'cartProducts__product');
      productElement.setAttribute('data-index', index); // Set a unique identifier
      productElement.innerHTML = `
          <span class="d-none">${product.id}</span>
          <div class="col-lg-1 col-2">
              <img src="${product.imgSrc}" class="w-100" alt="">
          </div>
          <div class="col-lg-3 col-2">${product.title}</div>
          <div class="col-4 "><span class="fs-5 fw-light">${product.totalCost} dh</span></div>
          <div class=" col-4 d-flex justify-content-between flex-wrap">
              <input type="number" class="cartProductQuantity m-lg-0 m-md-0 m-auto  " min="0" max="5" value="${product.quantity}">
              <button class="btn btn-dark text-secondary mt-lg-0 mt-md-0 mt-3 delete-btn">Supprimer</button>
          </div>
      `;
        cartContainer.appendChild(productElement);
        updateTotalCost(cartProducts);
        function updateTotalCost(products){
          const totalCost = products.reduce((sum, product) => sum + parseInt(product.totalCost), 0);
          localStorage.setItem('cartTotalCost', totalCost.toString());
          var cartTotalCost = document.getElementById('cartTotalCost');
          cartTotalCost.textContent=totalCost.toString();
        }
        updateCartCount(cartProducts);
      
        });
        function updateCartCount(products) {
          const totalCount = products.reduce((sum, product) => sum + parseInt(product.quantity), 0);
          localStorage.setItem('cartCount', totalCount.toString());
        }
        const cartProductQuantityInputs = document.querySelectorAll('.cartProductQuantity');
        cartProductQuantityInputs.forEach( input =>{
            input.addEventListener('change',function(){
              const cartProductIndex = this.closest('.cartProducts__product').getAttribute('data-index');
              const cartProduct = cartProducts[cartProductIndex];
              // Update the cart product quantity
              cartProduct.quantity = this.value;
              // Update the cart total cost
              cartProduct.totalCost = cartProduct.quantity * cartProduct.price;
              localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
              updateCartCount(cartProducts);
              // Update the display
              location.reload();
            }); 
        });

        const cartConfirm = document.getElementById('cartConfirmBtn');

        cartConfirm.addEventListener('click', () => {
          window.location.href = 'checkout.html';
        });


        // Add event listener for delete button
        const deleteButtons = document.querySelectorAll('.delete-btn');
        deleteButtons.forEach(button => {
            button.addEventListener('click', function () {
                const rowIndex = this.closest('.cartProducts__product').getAttribute('data-index');
                // Call a function to handle deletion based on the rowIndex
                handleDelete(rowIndex);
            });
         });
         function handleDelete(rowIndex) {
          // Retrieve cart information from localStorage
          let cartProducts = JSON.parse(localStorage.getItem('cartProducts')) || [];
        
          // Remove the product at the specified index
          cartProducts.splice(rowIndex, 1);
        
          // Store the updated cart state back in localStorage
          localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
          updateCartCount(cartProducts);
          // Refresh the page or update the display to reflect the changes
          location.reload();
        }
        });





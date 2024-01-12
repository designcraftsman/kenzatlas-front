// Store product categories outside the event handler
const productCategories = document.querySelectorAll('.shop__container__products__list__product__details__categorie');
const productStates = document.querySelectorAll('.shop__container__products__list__product__details__etat');

function getCheckedOptions() {
  var checkboxes = document.querySelectorAll('.form-check-input');
  var checkedOptions = [];

  checkboxes.forEach(checkbox => {
    if (checkbox.checked) {
      checkedOptions.push(checkbox.value);
    }
  });
  
  productStates.forEach((productState , index) => {
    const product = document.querySelectorAll('.shop__container__products__list__product')[index];
    console.log(productState.textContent);

    if (checkedOptions.includes(productState.textContent) || checkedOptions.length === 0) {
      product.classList.remove('d-none');
    }else {
      product.classList.add('d-none');
    }
  });


  // Iterate over products once
  productCategories.forEach((productCategorie, index) => {
    const product = document.querySelectorAll('.shop__container__products__list__product')[index];

    console.log(productCategorie.textContent);

    // Check if the product category is included in checked options
    if (checkedOptions.includes(productCategorie.textContent) || checkedOptions.length === 0) {
      product.classList.remove('d-none');
    }else {
      product.classList.add('d-none');
    }
  });

  console.log('Checked options:', checkedOptions);
}

// Attach the event listener to checkboxes
document.querySelectorAll('.form-check-input').forEach(checkbox => {
  checkbox.addEventListener('change', getCheckedOptions);
});

const itemsPerPage = 8;
let currentPage = 1;
let data = [];

function extractProductData(productElement) {
  const title = productElement.querySelector('.shop__container__products__list__product__title').textContent;
  const price = parseFloat(productElement.querySelector('.shop__container__products__list__product__price').textContent);
  const category = productElement.querySelector('.shop__container__products__list__product__details__categorie').textContent;
  const state = productElement.querySelector('.shop__container__products__list__product__details__etat').textContent;
  const image = productElement.querySelector('.shop__container__products__list__product__img').getAttribute('src');

  return { title, price, category, state, image };
}

function extractAllProductData() {
  const productElements = document.querySelectorAll('.shop__container__products__list__product');
  return Array.from(productElements, extractProductData);
}

function displayData() {
  const productsContainer = document.getElementById('productsContainer');
  const paginationContainer = document.getElementById('pagination');

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentPageData = data.slice(startIndex, endIndex);
  const currentPageHTML = currentPageData.map(product => {
    return `
      <div class="col-lg-5 col-md-6 col-12 m-auto product mt-4 shop__container__products__list__product">
        <div class="card border-0 m-auto w-100">
          <a href="product.html" class="text-decoration-none text-dark">
            <img src="${product.image}" class="card-img-top shop__container__products__list__product__img object-fit-cover" alt="...">
            <div class="card-body">
              <div class="d-none shop__container__products__list__product__details">
                <span class="shop__container__products__list__product__details__categorie">${product.category}</span>
                <span class="shop__container__products__list__product__details__etat">${product.state}</span>
              </div>
              <p class="card-text text-center m-1 fw-bolder"><span class="shop__container__products__list__product__price">${product.price.toFixed(2)}</span>dh</p>
              <p class="card-text text-center m-1 shop__container__products__list__product__title title">${product.title}</p>
              <p class="card-text text-center m-1"><i class="fa-solid fa-star fa-xs text-primary m-1"></i><i class="fa-solid fa-star fa-xs text-primary "></i><i class="fa-solid fa-star fa-xs text-primary m-1"></i><i class="fa-solid fa-star fa-xs m-1 text-primary "></i><i class="fa-solid fa-star m-1 fa-xs text-primary "></i></p>
            </div>
          </a>
        </div>
      </div>
    `;
  }).join('');

  productsContainer.innerHTML = currentPageHTML;

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const paginationHTML = generatePaginationHTML(currentPage, totalPages);

  paginationContainer.innerHTML = paginationHTML;
  // Display or hide pagination based on the number of pages
  paginationContainer.style.display = totalPages > 1 ? 'flex' : 'none';
}

function generatePaginationHTML(currentPage, totalPages) {
  const maxPagesToShow = 5;
  const paginationArray = [];

  if (totalPages <= maxPagesToShow) {
    for (let i = 1; i <= totalPages; i++) {
      paginationArray.push(i);
    }
  } else {
    const halfMax = Math.floor(maxPagesToShow / 2);
    const startPage = Math.max(1, currentPage - halfMax);
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (startPage > 1) {
      paginationArray.push(1);
      if (startPage > 2) {
        paginationArray.push('...');
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      paginationArray.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        paginationArray.push('...');
      }
      paginationArray.push(totalPages);
    }
  }

  return `
    <li class="page-item"><a class="page-link" href="#" onclick="changePage(${currentPage - 1})"> << </a></li>
    ${paginationArray.map(page => `
      <li class="page-item"><a class="page-link" href="#" onclick="changePage(${typeof page === 'number' ? page : currentPage})">${page}</a></li>
    `).join('')}
    <li class="page-item"><a class="page-link" href="#" onclick="changePage(${currentPage + 1})"> >> </a></li>
  `;
}


function changePage(pageNumber) {
  if (pageNumber < 1 || pageNumber > Math.ceil(data.length / itemsPerPage) || pageNumber === currentPage) {
    return;
  }
  currentPage = pageNumber;
  displayData();
}

data = extractAllProductData();
displayData();

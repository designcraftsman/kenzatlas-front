
// index.html

document.addEventListener('DOMContentLoaded', function() {
    const heroSectionButtons = document.querySelectorAll('.heroSection__container__carousel__item__info__btn');
    const exploreHair = document.getElementById('exploreHair');


    heroSectionButtons.forEach(function(button) {
      button.addEventListener('click', function() {
        window.location.href = 'shop.html';
            });
    });
  
    exploreHair.addEventListener('click', function() {
      // Navigate to shop.html
      window.location.href = 'shop.html';
    });
    const exploreSkin = document.getElementById('exploreSkin');
  
    exploreSkin.addEventListener('click', function() {
      // Navigate to shop.html
      window.location.href = 'shop.html';
    });
  });

  // shop.html





const lazyImages = document.querySelectorAll('img[loading="lazy"]'); // Get all images with the loading="lazy" attribute
function addLoadedClass(image) { // Function to add class to image parent after it is loaded
   const parentElement = image.parentElement;
   if (image.complete) { // Check if the image is loaded
      parentElement.classList.add('loaded');
   } else {
      image.addEventListener('load', function() { // Add a load event to add the class after the image has loaded
         parentElement.classList.add('loaded');
      });
   }
}
lazyImages.forEach(addLoadedClass); // Loop through all the images and call the addLoadedClass function for each one

/* === */

// Books top slider
let booksTopSlider = document.getElementById('books-top-slider');
if (booksTopSlider) {
   new Swiper(booksTopSlider, {
      navigation: {
         prevEl: '#books-wrap-slider-btn-prev',
         nextEl: '#books-wrap-slider-btn-next',
      },
      autoHeight: false,
      slidesPerView: 4,
      slidesPerGroup: 1,
      watchOverflow: true,
      spaceBetween: 24,
      loop: false,
      // Автопрокрутка
      /*autoplay: {
         // Пауза между прокруткой
         delay: 1000,

         // Закончить на последнем слайде
         stopOnLastSlide: true,

         // Отключить после ручного переключения
         disableOnInteraction: false,
      },*/
      speed: 800,
      effect: 'slide',
      breakpoints: {
         320: {
            slidesPerView: 1,
         },
         576: {
            slidesPerView: 2,
         },
         861: {
            slidesPerView: 3,
         },
         1101: {
            slidesPerView: 4,
         }
      },
      preloadImages: false,
      lazy: {
         loadOnTransitionStart: false,
         loadPrewNext: false,
      },
      watchSlidesProgress: true,
      watchSlidesVisibility: true,
   });
}

// Books top slider
function initializeBookBlocksSlider(slidersliderBookBlocksId, BookBlocksPaginationId) {
   const sliderBookBlocks = document.getElementById(slidersliderBookBlocksId);
   if (sliderBookBlocks) {
      new Swiper(sliderBookBlocks, {
         pagination: {
            el: `#${BookBlocksPaginationId}`,
            clickable: true,
         },
         autoHeight: false,
         slidesPerView: 3,
         slidesPerGroup: 1,
         watchOverflow: true,
         spaceBetween: 24,
         loop: false,
         speed: 800,
         effect: 'slide',
         breakpoints: {
            320: {
               slidesPerView: 1.236,
               spaceBetween: 20,
            },
            576: {
               slidesPerView: 1,
            },
            861: {
               slidesPerView: 2,
            },
            1161: {
               slidesPerView: 3,
            }
         },
      });
   }
}

// Books
function d(sliderBookId, prevBookBtnId, nextBookBtnId) {
   const sliderBook = document.getElementById(sliderBookId);
   if (sliderBook) {
      new Swiper(sliderBook, {
         navigation: {
            prevEl: `#${prevBookBtnId}`,
            nextEl: `#${nextBookBtnId}`,
         },
         watchOverflow: true,
         spaceBetween: 24,
         loop: false,
         speed: 800,
         effect: 'slide',
         //autoHeight: true,
         slidesPerView: 4,
         preloadImages: true,
         lazy: {
            loadOnTransitionStart: true,
            loadPrewNext: true,
         },
         watchSlidesProgress: true,
         watchSlidesVisibility: true,
         breakpoints: {
            0: {
               spaceBetween: 16,
               slidesPerView: 2,
               loop: true,
            },
            721: {
               spaceBetween: 16,
               slidesPerView: 3,
               loop: true,
            },
            1025: {
               spaceBetween: 24,
               slidesPerView: 4,
               loop: true,
            },
            1201: {
               spaceBetween: 24,
               slidesPerView: 4,
               loop: false,
            },
         }
      });
   }
}
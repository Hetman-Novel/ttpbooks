// Show search form
let showSearchForm = document.getElementById('show-search-form');
if (showSearchForm) {
   booksFsSearchForm = document.getElementById('books-fs-search-form');
   if (booksFsSearchForm) {
      showSearchForm.addEventListener('click', () => {
         booksFsSearchForm.classList.toggle('show');
      });
   }
}

// Function to equalize heights of .book__block-info
function setEqualHeight() {
	const boxes = document.querySelectorAll('.book__block-info');
	if (window.innerWidth >= 0) {
		if (boxes.length > 0) {	// Resetting altitude before recalculation
			boxes.forEach(box => box.style.height = 'auto');
			let height = 0;
			boxes.forEach(box => {
				const currentHeight = box.offsetHeight;
				if (currentHeight > height) {
					height = currentHeight;
				}
			});
			boxes.forEach(box => { // Set the same height
				box.style.height = `${height}px`;
			});
		}
	} else { // Reset height if width is less than 0
		boxes.forEach(box => box.style.height = 'auto');
	}
}
setEqualHeight();	// Initialization on page load
window.addEventListener('resize', setEqualHeight);	// Adding a handler for window resizing
window.addEventListener('orientationchange', setEqualHeight); // Adding a handler for screen orientation change (for mobile devices)

// Tabs
document.querySelectorAll('.tabs__wrap-tab .tab').forEach(function (tab) {
   tab.addEventListener('click', function () {
      const tabId = this.getAttribute('data-tab');

      // Снимаем активность со всех кнопок
      document.querySelectorAll('.tabs__wrap-tab .tab').forEach(t => t.classList.remove('tab-active'));

      // Активируем нажатую кнопку
      this.classList.add('tab-active');

      // Убираем активность у всех блоков с контентом
      document.querySelectorAll('.tabContent').forEach(c => c.classList.remove('content-active'));

      // Активируем только те блоки, у которых совпадает data-tabcontent
      document.querySelectorAll('.tabContent[data-tabcontent="' + tabId + '"]').forEach(c => {
         c.classList.add('content-active');
      });
   });
});


// Scroll to top
const btnToTop = document.getElementById('btn-to-top');
btnToTop.addEventListener('click', function() {
	window.scrollTo({ top: 0, behavior: 'smooth' });
});
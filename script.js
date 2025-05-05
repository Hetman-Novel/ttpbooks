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

document.addEventListener('DOMContentLoaded', function () {

   // Скролл по клику на список Chapters
   const scrollContainer = document.querySelector('.champer-page__content');
   const elements = document.querySelectorAll('[data-name]');
   const sections = document.querySelectorAll('[data-title]');
   function updateActiveClasses() {
      let currentSection = "";
      sections.forEach((section) => {
         const sectionTop = section.offsetTop - 30;
         if (scrollContainer.scrollTop >= sectionTop) {
            currentSection = section.getAttribute('data-title');
         }
      });
      elements.forEach((el) => {
         el.classList.toggle('active', el.getAttribute('data-name') === currentSection);
      });
   }
   scrollContainer.addEventListener('scroll', updateActiveClasses);
   elements.forEach(function (el) {
      el.addEventListener('click', function () {
         const name = el.getAttribute('data-name');
         const target = document.querySelector(`[data-title="${name}"]`);
         if (target) {
            scrollContainer.scrollTo({
               top: target.offsetTop - 30,
               behavior: 'smooth'
            });
         }
      });
   });
   updateActiveClasses();

   const container = document.querySelector('.champer-page__content');

   // Прогресс чтения
   const progressEl = document.querySelector('.champer-page__number-of-words[data-type="progress"]');
   const sections1 = container.querySelectorAll('[data-title]');
   if (progressEl && sections1.length > 0) {
      const span1 = progressEl.querySelector('span');
      function updateProgress() {
         const scrollTop = container.scrollTop;
         const scrollHeight = container.scrollHeight - container.clientHeight;
         const percent = Math.round((scrollTop / scrollHeight) * 100);
         span1.textContent = percent;
         progressEl.lastChild.textContent = '%';
      }
      container.addEventListener('scroll', updateProgress);
      updateProgress();
   }

   // Номер главы
   const chaptersEl = document.querySelector('.champer-page__number-of-words[data-type="chapters"]');
   const sections2 = container.querySelectorAll('[data-title]');
   if (chaptersEl && sections2.length > 0) {
      const span2 = chaptersEl.querySelector('span');
      function updateChapterCounter() {
         let currentIndex = 0;
         sections2.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            if (sectionTop - container.scrollTop < container.clientHeight / 2) {
               currentIndex = index;
            }
         });
         span2.textContent = currentIndex + 1;
         chaptersEl.lastChild.textContent = '/' + sections2.length;
      }
      container.addEventListener('scroll', updateChapterCounter);
      updateChapterCounter();
   }
});


// Scroll to top
const btnToTop = document.getElementById('btn-to-top');
if (btnToTop) {
   btnToTop.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
   });
}
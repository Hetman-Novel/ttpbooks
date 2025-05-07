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

   // 
   let champerPageBodyBlockDelete = document.querySelector('.champer-page__bodyBlockDelete');
   if (champerPageBodyBlockDelete) {
      document.querySelector('.champer-page__blockDelete .link.color').addEventListener('click', () => {
         champerPageBodyBlockDelete.classList.remove('show');
      });

      let popup = document.querySelector('.champer-page__bodyBlockDelete');
      let confirmDeleteBtn = document.querySelector('.champer-page__blockDelete .confirm-delete');
      let cancelDeleteBtn = document.querySelector('.champer-page__blockDelete .link.color');

      let blockToDelete = null; // сюда будем сохранять нужный блок

      // 1. Вешаем обработчик на все иконки удаления
      document.querySelectorAll('.champer-page__blockText .delete').forEach(icon => {
         icon.addEventListener('click', (e) => {
            // сохраняем родительский блок, который нужно удалить
            blockToDelete = icon.closest('.champer-page__blockText');

            // показываем попап
            popup.classList.add('show');
         });
      });

      // 2. Кнопка "Отмена" — просто закрывает попап
      if (cancelDeleteBtn) {
         cancelDeleteBtn.addEventListener('click', () => {
            popup.classList.remove('show');
            blockToDelete = null; // сбрасываем
         });
      }

      // 3. Кнопка "Подтвердить удаление"
      if (confirmDeleteBtn) {
         confirmDeleteBtn.addEventListener('click', () => {
            if (blockToDelete) {
               blockToDelete.remove(); // удаляем нужный блок
               blockToDelete = null;  // очищаем переменную
            }
            popup.classList.remove('show'); // закрываем попап
         });
      }
   }

   // Скролл по клику на список Chapters
   const scrollContainer = document.querySelector('.champer-page__content');
   const elements = document.querySelectorAll('[data-name]');
   const sections = document.querySelectorAll('[data-title]');

   customOffsetTop = 30;
   if (window.matchMedia("(max-width: 767px)").matches) {
      customOffsetTop = 41;
   }
   if (window.matchMedia("(max-width: 575px)").matches) {
      customOffsetTop = 72;
   }

   function updateActiveClasses() {
      let currentSection = "";
      sections.forEach((section) => {
         const sectionTop = section.offsetTop - customOffsetTop;
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
               top: target.offsetTop - customOffsetTop,
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

   // для смены цвета при выделении текста
   const containers = document.querySelectorAll('.js-change-selection-color');
   containers.forEach((container, index) => {
      const radios = container.querySelectorAll('input[name="highlight-color"]');
      const form = container.querySelector('.champer-page__blockToSelectAcolorWhenSelecting form');
      const notify = form?.querySelector('.notify');
      const storageKey = 'highlightColorBlock' + index;
   
      // Восстановление из localStorage
      const storedClass = localStorage.getItem(storageKey);
      if (storedClass) {
         container.classList.add(storedClass);
         const matchingRadio = container.querySelector(`input.${storedClass}`);
         if (matchingRadio) matchingRadio.checked = true;
      }
   
      // Применение класса
      const applySelectedColorClass = () => {
         container.classList.remove('vivid-pink', 'strong-cyan', 'dark-moderate-violet', 'strong-yellow');
         const selected = container.querySelector('input[name="highlight-color"]:checked');
         if (selected) {
            const colorClass = selected.classList[0];
            container.classList.add(colorClass);
         }
      };
   
      // Назначаем на все радиокнопки
      radios.forEach(radio => {
         radio.addEventListener('change', applySelectedColorClass);
      });
   
      // Обработка сабмита формы
      if (form) {
         form.addEventListener('submit', (e) => {
            e.preventDefault(); // Предотвращаем перезагрузку
   
            const selected = container.querySelector('input[name="highlight-color"]:checked');
            if (selected) {
            const colorClass = selected.classList[0];
            localStorage.setItem(storageKey, colorClass);
            }
   
            // Показ уведомления
            if (notify) {
               notify.classList.add('show');
               setTimeout(() => {
                  notify.classList.remove('show');
               }, 3000); // 3 секунды
            }
         });
      }
   
      // Применяем при загрузке
      applySelectedColorClass();
   });

   // Закрыть по клику на Cancel
   const champerPageBlockToSelectAcolorWhenSelecting = document.querySelector('.champer-page__blockToSelectAcolorWhenSelecting');
   if (champerPageBlockToSelectAcolorWhenSelecting) {
      document.querySelector('button.cancel').addEventListener('click', () => {
         champerPageBlockToSelectAcolorWhenSelecting.classList.remove('show');
      });
   }

   // при выделении текста появляются кнопки, по клику на одну из них запускается блок выбора цвета
   const selectionActions = document.querySelector('.selection-actions');
   const addNoteBtn = selectionActions.querySelector('.add-note');
   const targetBlock = document.querySelector('.champer-page__blockToSelectAcolorWhenSelecting');
   const selectionArea = document.querySelector('.js-change-selection-color');
   document.addEventListener('mouseup', (e) => {
      const selection = window.getSelection();
      const text = selection.toString().trim();
      const isInsideExcluded = targetBlock.contains(selection.anchorNode);
   
      // Показываем панель только если:
      // 1. Есть текст
      // 2. Выделение внутри js-change-selection-color
      // 3. НЕ внутри champer-page__blockToSelectAcolorWhenSelecting
      if (
         text.length > 0 &&
         selectionArea.contains(selection.anchorNode) &&
         !isInsideExcluded
      ) {
         const range = selection.getRangeAt(0);
         const rect = range.getBoundingClientRect();
   
         selectionActions.style.display = 'block';
         selectionActions.style.top = `${window.scrollY + rect.top - 45}px`;
         selectionActions.style.left = `${window.scrollX + rect.left}px`;
         selectionActions.dataset.selectedText = text;
      } else {
         selectionActions.style.display = 'none';
         delete selectionActions.dataset.selectedText;
      }
   });
   addNoteBtn.addEventListener('click', () => {
      const selection = window.getSelection();
      const selectedText = selection.toString().trim();
      if (!selectedText) return;
   
      const anchorNode = selection.anchorNode;
      if (!anchorNode || anchorNode.nodeType !== Node.TEXT_NODE) return;
   
      const fullText = anchorNode.textContent;
      const start = selection.anchorOffset;
      const end = selection.focusOffset;
   
      const realStart = Math.min(start, end);
      const realEnd = Math.max(start, end);
   
      const padding = 15;
      const extendedStart = Math.max(0, realStart - padding);
      const extendedEnd = Math.min(fullText.length, realEnd + padding);
   
      const before = fullText.substring(extendedStart, realStart);
      const highlighted = fullText.substring(realStart, realEnd);
      const after = fullText.substring(realEnd, extendedEnd);
   
      const result = `${before}<span>${highlighted}</span>${after}`;
   
      const targetBlock = document.querySelector('.champer-page__blockToSelectAcolorWhenSelecting');
      const targetP = targetBlock.querySelector('p');
   
      if (targetP) {
         targetP.innerHTML = result;
      }
   
      targetBlock.classList.add('show');
      selection.removeAllRanges();
      selectionActions.style.display = 'none';
   });
   document.addEventListener('mousedown', (e) => {
      if (!selectionActions.contains(e.target)) {
         selectionActions.style.display = 'none';
      }
   });

   // Champer page button menu
   let champerPageButtonMenu = document.querySelector('.champer-page__buttonMenu');
   if (champerPageButtonMenu) {
      champerPageButtonMenu.addEventListener('click', () => {
         champerPageButtonMenu.classList.toggle('active');
      });
   }

   // Block closing to 767
   let champerPageBtnsBlockClose = document.querySelectorAll('.champer-page__btnBlockClose');
   if (champerPageBtnsBlockClose.length > 0) {
      champerPageBtnsBlockClose.forEach((champerPageBtnBlockClose) => {
         champerPageBtnBlockClose.addEventListener('click', () => {
            champerPageBtnBlockClose.parentNode.parentNode.classList.remove('show');
         });
      });
   }

   // Показ блока ChampersList до 767
   let buttonShowBlockChaptersList = document.getElementById('button-show-block-chapters-list');
   if (buttonShowBlockChaptersList) {
      let blockChampersList = document.getElementById('block-champers-list');

      if (blockChampersList) {
         buttonShowBlockChaptersList.addEventListener('click', (e) => {
            e.preventDefault();
            blockChampersList.classList.toggle('show');
         });
      }
   }

   // Показ блока WithTabs до 767
   let buttonShowBlockWithTabs = document.getElementById('button-show-block-with-tabs');
   if (buttonShowBlockWithTabs) {
      let blockTabs = document.getElementById('block-tabs');

      if (blockTabs) {
         buttonShowBlockWithTabs.addEventListener('click', (e) => {
            e.preventDefault();
            blockTabs.classList.toggle('show');
         });
      }
   }

   // Показ блока WithTabs (с поиском) до 767
   let buttonShowBlockSearch = document.getElementById('button-show-block-search');
   if (buttonShowBlockSearch) {
      let blockSearch = document.getElementById('block-search');

      if (blockSearch) {
         buttonShowBlockSearch.addEventListener('click', (e) => {
            e.preventDefault();
            blockSearch.classList.toggle('show');
         });
      }
   }

   // Спрятать блока ChampersList до 767 по клику на любой элемент списка
   let champerPageBlockChampersListsLi = document.querySelectorAll('.champer-page__blockChampersList .champers__list li');
   if (champerPageBlockChampersListsLi.length > 0) {
      champerPageBlockChampersListsLi.forEach((champerPageBlockChampersListLi) => {
         champerPageBlockChampersListLi.addEventListener('click', () => {
            champerPageBlockChampersListLi.parentNode.parentNode.classList.remove('show');
         })
      });
   }
});

// Scroll to top
const btnToTop = document.getElementById('btn-to-top');
if (btnToTop) {
   btnToTop.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
   });
}
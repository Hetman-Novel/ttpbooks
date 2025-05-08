document.addEventListener('DOMContentLoaded', function () {

   // Первый плеер (маленький, минималистичный):
   const playButtons = document.querySelectorAll('.audio-player__play');
   if (playButtons.length > 0) {
      playButtons.forEach(button => {
         const audioId = button.getAttribute('data-audio-id');
         const audio = document.getElementById(audioId);
         const parent = button.closest('.audio-player');
         const progressFill = parent.querySelector('.audio-player__progress-fill');
         const durationEl = parent.querySelector('.audio-player__duration');
         const reverse = durationEl.dataset.reverse === 'true'; // если стоит data-reverse="true"
         const progressBar = parent.querySelector('.audio-player__progress-bar');

         progressBar.addEventListener('click', function (e) {
            const rect = progressBar.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const width = rect.width;
            const percent = clickX / width;
            audio.currentTime = percent * audio.duration;
         });

         button.addEventListener('click', () => {

            if (audio.paused) {
               audio.play();
               parent.classList.add('playing');
            } else {
               audio.pause();
               parent.classList.remove('playing');
            }
         });

         audio.addEventListener('timeupdate', () => {
            const percent = (audio.currentTime / audio.duration) * 100;
            progressFill.style.width = percent + '%';
      
            let time = reverse ? audio.duration - audio.currentTime : audio.currentTime;
            time = time < 0 ? 0 : time;
      
            const minutes = Math.floor(time / 60);
            const seconds = Math.floor(time % 60).toString().padStart(2, '0');
            durationEl.textContent = `${minutes}:${seconds}`;
         });

         audio.addEventListener('loadedmetadata', () => {

            if (!reverse) {
               const minutes = Math.floor(audio.duration / 60);
               const seconds = Math.floor(audio.duration % 60).toString().padStart(2, '0');
               durationEl.textContent = `${minutes}:${seconds}`;
            } else {
               durationEl.textContent = '0:00';
            }
         });

         audio.addEventListener('ended', () => {
            parent.classList.remove('playing');
            progressFill.style.width = '0%';
         });
      });
   }

   // Второй плеер (полный, расширенный):
   const player = document.querySelector('.audio-player--full');
   if (!player) return;

   const playBtn = player.querySelector('.audio-player__btn.play');
   const audioId = playBtn.getAttribute('data-audio-id');
   const audio = document.getElementById(audioId);
   const progressFill = player.querySelector('.audio-player__progress-fill');
   const progressBar = player.querySelector('.audio-player__progress-bar');
   const volumeBar = player.querySelector('.audio-player__volume-bar');
   const volumeFill = player.querySelector('.audio-player__volume-fill');
   const startTime = player.querySelector('.audio-player__time--start');
   const endTime = player.querySelector('.audio-player__time--end');
   const muteBtn = player.querySelector('.audio-player__btn.mute');

   // Обновление времени
   function formatTime(seconds) {
      const m = Math.floor(seconds / 60);
      const s = Math.floor(seconds % 60).toString().padStart(2, '0');
      return `${m}:${s}`;
   }

   // Воспроизведение / пауза
   playBtn.addEventListener('click', () => {
      if (audio.paused) {
         audio.play();
         player.classList.add('playing');
      } else {
         audio.pause();
         player.classList.remove('playing');
      }
   });

   // Прогресс
   audio.addEventListener('timeupdate', () => {
      const percent = (audio.currentTime / audio.duration) * 100;
      progressFill.style.width = percent + '%';
      startTime.textContent = formatTime(audio.currentTime);
   });

   // Общая длительность
   audio.addEventListener('loadedmetadata', () => {
      endTime.textContent = formatTime(audio.duration);
   });

   // Завершение воспроизведения
   audio.addEventListener('ended', () => {
      player.classList.remove('playing');
      progressFill.style.width = '0%';
      startTime.textContent = '0:00';
   });

   // Перемотка по клику на прогресс-бар
   progressBar.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const percent = clickX / rect.width;
      audio.currentTime = percent * audio.duration;
   });

   // Громкость (от 0 до 1)
   volumeBar.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const percent = clickX / rect.width;
      audio.volume = percent;
      volumeFill.style.width = percent * 100 + '%';
   });

   // Mute / Unmute
   muteBtn.addEventListener('click', () => {
      audio.muted = !audio.muted;
      muteBtn.classList.toggle('muted', audio.muted);
   });

   // Получаем data-volume и применяем громкость
   const initialVolumeAttr = volumeBar.getAttribute('data-volume');
   const initialVolume = Math.max(0, Math.min(100, parseInt(initialVolumeAttr))); // ограничение от 0 до 100
   const normalizedVolume = initialVolume / 100;

   audio.volume = normalizedVolume;
   volumeFill.style.width = initialVolume + '%';

   volumeBar.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const percent = Math.max(0, Math.min(1, clickX / rect.width));
      audio.volume = percent;
      const volumePercent = Math.round(percent * 100);
      volumeFill.style.width = volumePercent + '%';
      volumeBar.setAttribute('data-volume', volumePercent); // обновим атрибут
   });
});
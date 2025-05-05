document.addEventListener('DOMContentLoaded', function () {
   const playButtons = document.querySelectorAll('.audio-player__play');
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
});
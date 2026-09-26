/* ============================================================
   ROMANTIC ANNIVERSARY WEBSITE JAVASCRIPT
   Crafted with love for Raie & Dhruv's 1st Anniversary
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  
  // ------------------------------------------------------------
  // 1. CONFIGURATION: Set the date of your 1st Anniversary / Start Date
  // ------------------------------------------------------------
  // Official dating anniversary: September 27, 2025 (1st Anniversary is September 27, 2026!)
  const ANNIVERSARY_START_DATE = new Date("2025-09-27T00:00:00");

  // ------------------------------------------------------------
  // 2. ROMANTIC AMBIENT AUDIO CONTROLLER & SYNTHESIZER FALLBACK
  // ------------------------------------------------------------
  const bgAudio = document.getElementById('bg-audio');
  const musicController = document.getElementById('musicController');
  const vinylRecord = document.getElementById('vinylRecord');
  const musicStatus = document.getElementById('musicStatus');
  const musicIcon = document.getElementById('musicIcon');
  let isPlaying = false;
  let synthAudioActive = false;
  let audioCtx = null;
  let synthInterval = null;

  // Gentle procedural piano/chime synthesizer in case MP3 is unavailable or offline
  function startFallbackRomanticMelody() {
    if (synthAudioActive) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      audioCtx = new AudioContext();
      synthAudioActive = true;

      // Romantic chord progression frequencies: Cmaj7 -> Am9 -> Fmaj7 -> Gsus4
      const chords = [
        [261.63, 329.63, 392.00, 493.88], // C E G B
        [220.00, 261.63, 329.63, 392.00], // A C E G
        [174.61, 220.00, 261.63, 329.63], // F A C E
        [196.00, 246.94, 293.66, 392.00]  // G B D G
      ];

      let chordIdx = 0;
      let noteIdx = 0;

      function playGentleNote(freq) {
        if (!audioCtx || audioCtx.state === 'suspended') {
          audioCtx && audioCtx.resume();
        }
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        // Warm sine wave with soft bell harmonics
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

        // Soft envelope: gentle attack, long warm decay
        gain.gain.setValueAtTime(0.001, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.08, audioCtx.currentTime + 0.12);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 2.5);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start();
        osc.stop(audioCtx.currentTime + 2.6);
      }

      synthInterval = setInterval(() => {
        const currentChord = chords[chordIdx];
        const note = currentChord[noteIdx];
        playGentleNote(note);

        noteIdx++;
        if (noteIdx >= currentChord.length) {
          noteIdx = 0;
          chordIdx = (chordIdx + 1) % chords.length;
        }
      }, 700);

    } catch (e) {
      console.log('Web Audio Synth fallback not supported:', e);
    }
  }

  function stopFallbackMelody() {
    if (synthInterval) {
      clearInterval(synthInterval);
      synthInterval = null;
    }
    if (audioCtx) {
      audioCtx.close().catch(() => {});
      audioCtx = null;
    }
    synthAudioActive = false;
  }

  function startMusic() {
    // Attempt standard HTML5 audio
    bgAudio.volume = 0.65;
    const playPromise = bgAudio.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          isPlaying = true;
          updateMusicUI(true);
        })
        .catch(error => {
          // If browser blocked or media source failed, trigger romantic synth chime
          console.log("Audio file auto-blocked or missing; activating ambient chime harmony:", error);
          startFallbackRomanticMelody();
          isPlaying = true;
          updateMusicUI(true);
        });
    } else {
      isPlaying = true;
      updateMusicUI(true);
    }
  }

  function pauseMusic() {
    bgAudio.pause();
    stopFallbackMelody();
    isPlaying = false;
    updateMusicUI(false);
  }

  function toggleMusic() {
    if (isPlaying) {
      pauseMusic();
    } else {
      startMusic();
    }
  }

  function updateMusicUI(active) {
    if (active) {
      vinylRecord.classList.add('playing');
      musicIcon.classList.remove('fa-play');
      musicIcon.classList.add('fa-pause');
      musicStatus.textContent = "Playing ❤️";
    } else {
      vinylRecord.classList.remove('playing');
      musicIcon.classList.remove('fa-pause');
      musicIcon.classList.add('fa-play');
      musicStatus.textContent = "Paused";
    }
  }

  musicController.addEventListener('click', toggleMusic);

  // ------------------------------------------------------------
  // 3. 3D ENVELOPE OPENING ANIMATION & REVEAL
  // ------------------------------------------------------------
  const envelope = document.getElementById('envelope');
  const waxSeal = document.getElementById('waxSeal');
  const openLetterBtn = document.getElementById('openLetterBtn');
  const mainContent = document.getElementById('mainContent');
  const heroSection = document.getElementById('heroSection');
  let hasOpened = false;

  function openEnvelope() {
    if (hasOpened) return;
    hasOpened = true;

    // Start background music seamlessly on user gesture
    startMusic();

    // Trigger envelope opening 3D animation
    envelope.classList.add('open');

    // Trigger heart confetti celebration on opening
    triggerHeartBurst(window.innerWidth / 2, window.innerHeight * 0.45, 30);

    setTimeout(() => {
      // Reveal the main love letter and website content
      mainContent.classList.add('visible');

      // Smooth scroll down to the letter
      const letterSection = document.getElementById('letterSection');
      letterSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 1200);
  }

  waxSeal.addEventListener('click', (e) => {
    e.stopPropagation();
    openEnvelope();
  });

  envelope.addEventListener('click', openEnvelope);
  openLetterBtn.addEventListener('click', openEnvelope);

  // ------------------------------------------------------------
  // 4. LIVE RELATIONSHIP TIMER (DAYS, HOURS, MINUTES, SECONDS)
  // ------------------------------------------------------------
  const countDays = document.getElementById('countDays');
  const countHours = document.getElementById('countHours');
  const countMinutes = document.getElementById('countMinutes');
  const countSeconds = document.getElementById('countSeconds');

  function updateAnniversaryTimer() {
    const now = new Date();
    const diff = Math.max(0, now - ANNIVERSARY_START_DATE);

    const seconds = Math.floor((diff / 1000) % 60);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (countDays) countDays.textContent = days;
    if (countHours) countHours.textContent = String(hours).padStart(2, '0');
    if (countMinutes) countMinutes.textContent = String(minutes).padStart(2, '0');
    if (countSeconds) countSeconds.textContent = String(seconds).padStart(2, '0');
  }

  updateAnniversaryTimer();
  setInterval(updateAnniversaryTimer, 1000);

  // ------------------------------------------------------------
  // 5. INTERACTIVE POLAROID PHOTO GALLERY & LIGHTBOX MODAL
  // ------------------------------------------------------------
  const polaroids = document.querySelectorAll('.polaroid-card');
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxOverlay = document.getElementById('lightboxOverlay');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxStory = document.getElementById('lightboxStory');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  let currentPhotoIndex = 0;
  const photoData = [];

  polaroids.forEach((card, index) => {
    const img = card.querySelector('.polaroid-img');
    const caption = card.getAttribute('data-caption') || card.querySelector('.caption-text').textContent;
    const story = card.getAttribute('data-story') || '';
    const src = img.src;

    photoData.push({ src, caption, story });

    card.addEventListener('click', () => {
      openLightbox(index);
    });
  });

  function openLightbox(index) {
    currentPhotoIndex = index;
    updateLightboxContent();
    lightboxModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // prevent background scrolling
  }

  function closeLightbox() {
    lightboxModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function updateLightboxContent() {
    const photo = photoData[currentPhotoIndex];
    if (!photo) return;
    lightboxImg.src = photo.src;
    lightboxCaption.textContent = photo.caption;
    lightboxStory.textContent = photo.story;
  }

  function prevPhoto() {
    currentPhotoIndex = (currentPhotoIndex - 1 + photoData.length) % photoData.length;
    updateLightboxContent();
  }

  function nextPhoto() {
    currentPhotoIndex = (currentPhotoIndex + 1) % photoData.length;
    updateLightboxContent();
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxOverlay) lightboxOverlay.addEventListener('click', closeLightbox);
  if (lightboxPrev) lightboxPrev.addEventListener('click', prevPhoto);
  if (lightboxNext) lightboxNext.addEventListener('click', nextPhoto);

  // Keyboard controls for lightbox
  window.addEventListener('keydown', (e) => {
    if (!lightboxModal.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') prevPhoto();
    if (e.key === 'ArrowRight') nextPhoto();
  });

  // ------------------------------------------------------------
  // 6. INTERACTIVE FLIP CARDS (FOR TOUCH & MOBILE TAP)
  // ------------------------------------------------------------
  const flipCards = document.querySelectorAll('.flip-card');
  flipCards.forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('flipped');
    });
  });

  // ------------------------------------------------------------
  // 7. SURPRISE CELEBRATION MODAL & HEART CONFETTI EXPLOSION
  // ------------------------------------------------------------
  const surpriseBtn = document.getElementById('surpriseBtn');
  const celebrationModal = document.getElementById('celebrationModal');
  const celebrationClose = document.getElementById('celebrationClose');
  const celebrationOverlay = document.getElementById('celebrationOverlay');
  const celebrationBtn = document.getElementById('celebrationBtn');

  function showCelebration() {
    celebrationModal.classList.add('active');
    // Massive hearts & sparkles explosion!
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        const rx = window.innerWidth * (0.2 + Math.random() * 0.6);
        const ry = window.innerHeight * (0.3 + Math.random() * 0.4);
        triggerHeartBurst(rx, ry, 25);
      }, i * 250);
    }
  }

  function closeCelebration() {
    celebrationModal.classList.remove('active');
  }

  if (surpriseBtn) surpriseBtn.addEventListener('click', showCelebration);
  if (celebrationClose) celebrationClose.addEventListener('click', closeCelebration);
  if (celebrationOverlay) celebrationOverlay.addEventListener('click', closeCelebration);
  if (celebrationBtn) {
    celebrationBtn.addEventListener('click', () => {
      closeCelebration();
      triggerHeartBurst(window.innerWidth / 2, window.innerHeight / 2, 40);
    });
  }

  // ------------------------------------------------------------
  // 7.5. BUMBLE SWIPE EASTER EGG & MATCH MODAL
  // ------------------------------------------------------------
  const bumbleCard = document.getElementById('bumbleCard');
  const bumblePassBtn = document.getElementById('bumblePassBtn');
  const bumbleStarBtn = document.getElementById('bumbleStarBtn');
  const bumbleLikeBtn = document.getElementById('bumbleLikeBtn');
  const passTeaseMsg = document.getElementById('passTeaseMsg');
  const bumbleModal = document.getElementById('bumbleModal');
  const bumbleModalClose = document.getElementById('bumbleModalClose');
  const bumbleModalOverlay = document.getElementById('bumbleModalOverlay');
  const bumbleKeepSwipingBtn = document.getElementById('bumbleKeepSwipingBtn');

  let passAttempts = 0;
  const teaseMessages = [
    "Nice try! You know you can't swipe left on Dhruv 😉",
    "Error 404: Pass button disabled for your soulmate! 💛",
    "Fate already decided 365 days ago! Swipe right! 🐝✨",
    "The universe says NO to passing! Tap the heart ❤️"
  ];

  if (bumblePassBtn) {
    function dodgePassButton(e) {
      if (e) e.preventDefault();
      const randomX = (Math.random() - 0.5) * 60;
      const randomY = (Math.random() - 0.5) * 30;
      bumblePassBtn.style.transform = `translate(${randomX}px, ${randomY}px) scale(0.9)`;
      
      if (passTeaseMsg) {
        passTeaseMsg.textContent = teaseMessages[passAttempts % teaseMessages.length];
        passTeaseMsg.style.color = "#dc2626";
      }
      passAttempts++;

      setTimeout(() => {
        bumblePassBtn.style.transform = '';
      }, 700);
    }

    bumblePassBtn.addEventListener('click', dodgePassButton);
    bumblePassBtn.addEventListener('mouseenter', () => {
      if (passAttempts === 0) dodgePassButton();
    });
  }

  function handleBumbleMatch() {
    if (bumbleCard) {
      bumbleCard.classList.add('swiped-right');
    }

    // Celebration burst
    for (let i = 0; i < 4; i++) {
      setTimeout(() => {
        const rx = window.innerWidth * (0.3 + Math.random() * 0.4);
        const ry = window.innerHeight * (0.3 + Math.random() * 0.3);
        triggerHeartBurst(rx, ry, 30);
      }, i * 200);
    }

    setTimeout(() => {
      if (bumbleModal) {
        bumbleModal.classList.add('active');
      }
    }, 600);
  }

  if (bumbleLikeBtn) bumbleLikeBtn.addEventListener('click', handleBumbleMatch);
  if (bumbleStarBtn) bumbleStarBtn.addEventListener('click', handleBumbleMatch);

  function closeBumbleModal() {
    if (bumbleModal) bumbleModal.classList.remove('active');
    if (bumbleCard) {
      setTimeout(() => {
        bumbleCard.classList.remove('swiped-right');
        bumbleCard.classList.add('matched-reset');
        if (passTeaseMsg) {
          passTeaseMsg.textContent = "Matched with Dhruv 365 days ago! 💛🐝";
          passTeaseMsg.style.color = "#16a34a";
        }
      }, 400);
    }
  }

  if (bumbleModalClose) bumbleModalClose.addEventListener('click', closeBumbleModal);
  if (bumbleModalOverlay) bumbleModalOverlay.addEventListener('click', closeBumbleModal);
  if (bumbleKeepSwipingBtn) {
    bumbleKeepSwipingBtn.addEventListener('click', () => {
      closeBumbleModal();
      const gallerySection = document.getElementById('gallerySection');
      if (gallerySection) {
        gallerySection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // ------------------------------------------------------------
  // 8. HIGH-PERFORMANCE FLOATING HEARTS & PARTICLES CANVAS
  // ------------------------------------------------------------
  const canvas = document.getElementById('particles-canvas');
  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const burstParticles = [];
  const colors = [
    'rgba(216, 27, 96, ',   // Rose Pink
    'rgba(240, 98, 146, ',  // Light Rose
    'rgba(255, 182, 193, ', // Soft Blush
    'rgba(212, 175, 55, ',  // Champagne Gold
    'rgba(255, 64, 129, '   // Bright Pink
  ];

  class AmbientParticle {
    constructor() {
      this.reset();
      this.y = Math.random() * height; // initial spread
    }

    reset() {
      this.x = Math.random() * width;
      this.y = height + 20;
      this.size = Math.random() * 12 + 8;
      this.speedY = Math.random() * 0.8 + 0.4;
      this.speedX = (Math.random() - 0.5) * 0.5;
      this.baseColor = colors[Math.floor(Math.random() * colors.length)];
      this.alpha = Math.random() * 0.45 + 0.15;
      this.angle = Math.random() * Math.PI * 2;
      this.rotationSpeed = (Math.random() - 0.5) * 0.02;
      this.type = Math.random() > 0.35 ? 'heart' : 'sparkle';
    }

    update() {
      this.y -= this.speedY;
      this.x += Math.sin(this.angle) * 0.4 + this.speedX;
      this.angle += 0.02;

      if (this.y < -30 || this.x < -30 || this.x > width + 30) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);

      if (this.type === 'heart') {
        drawHeart(ctx, 0, 0, this.size, this.baseColor + this.alpha + ')');
      } else {
        drawSparkle(ctx, 0, 0, this.size * 0.7, this.baseColor + this.alpha + ')');
      }

      ctx.restore();
    }
  }

  class BurstParticle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 7 + 2;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed - 1.5;
      this.gravity = 0.18;
      this.friction = 0.96;
      this.size = Math.random() * 14 + 10;
      this.baseColor = colors[Math.floor(Math.random() * colors.length)];
      this.alpha = 1;
      this.decay = Math.random() * 0.015 + 0.012;
      this.rotation = Math.random() * Math.PI * 2;
      this.rotSpeed = (Math.random() - 0.5) * 0.15;
    }

    update() {
      this.vx *= this.friction;
      this.vy *= this.friction;
      this.vy += this.gravity;
      this.x += this.vx;
      this.y += this.vy;
      this.alpha -= this.decay;
      this.rotation += this.rotSpeed;
    }

    draw() {
      if (this.alpha <= 0) return;
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      drawHeart(ctx, 0, 0, this.size, this.baseColor + this.alpha + ')');
      ctx.restore();
    }
  }

  function drawHeart(c, x, y, size, color) {
    c.fillStyle = color;
    c.beginPath();
    const topCurveHeight = size * 0.3;
    c.moveTo(x, y + topCurveHeight);
    // top left curve
    c.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + topCurveHeight);
    // bottom left curve
    c.bezierCurveTo(x - size / 2, y + (size + topCurveHeight) / 2, x, y + (size + topCurveHeight) / 2, x, y + size);
    // bottom right curve
    c.bezierCurveTo(x, y + (size + topCurveHeight) / 2, x + size / 2, y + (size + topCurveHeight) / 2, x + size / 2, y + topCurveHeight);
    // top right curve
    c.bezierCurveTo(x + size / 2, y, x, y, x, y + topCurveHeight);
    c.closePath();
    c.fill();
  }

  function drawSparkle(c, x, y, size, color) {
    c.fillStyle = color;
    c.beginPath();
    for (let i = 0; i < 4; i++) {
      const angle = (i * Math.PI) / 2;
      c.lineTo(x + Math.cos(angle) * size, y + Math.sin(angle) * size);
      const innerAngle = angle + Math.PI / 4;
      c.lineTo(x + Math.cos(innerAngle) * (size * 0.3), y + Math.sin(innerAngle) * (size * 0.3));
    }
    c.closePath();
    c.fill();
  }

  function triggerHeartBurst(x, y, count = 25) {
    for (let i = 0; i < count; i++) {
      burstParticles.push(new BurstParticle(x, y));
    }
  }

  // Populate ambient floating particles
  const particleCount = Math.min(35, Math.floor(window.innerWidth / 35));
  for (let i = 0; i < particleCount; i++) {
    particles.push(new AmbientParticle());
  }

  function animateCanvas() {
    ctx.clearRect(0, 0, width, height);

    // Draw ambient floating hearts
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }

    // Draw burst explosion particles
    for (let i = burstParticles.length - 1; i >= 0; i--) {
      burstParticles[i].update();
      burstParticles[i].draw();
      if (burstParticles[i].alpha <= 0) {
        burstParticles.splice(i, 1);
      }
    }

    requestAnimationFrame(animateCanvas);
  }

  animateCanvas();
});

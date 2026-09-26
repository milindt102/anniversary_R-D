# 💖 Happy 1st Anniversary Website for Raie

A romantic, personalized, and interactive gift website created by **Dhruv** for **Raie**.

---

## ✨ Features Included

1. **💌 3D Interactive Wax-Sealed Envelope**:
   - Custom wax seal with **R & D** initials and glowing heart.
   - Smooth 3D flap opening and peek-out card animation when clicked.
   - Smoothly launches the background romantic music.

2. **📜 The Heartfelt Love Letter**:
   - Authentic vintage parchment letter aesthetic with deckled edges and ornate corner flourishes.
   - Your complete personal letter to Raie, formatted with elegant typography and your signature.

3. **⏳ Live Relationship Journey Counter**:
   - Live counter tracking days, hours, minutes, and seconds.
   - Special milestone tags: Marathon Video Calls, First Date Gifts & Hugs, Getting Trapped Together, Late Night Cuddles, and Always In My Corner.

4. **📸 Interactive Polaroid Photo Gallery**:
   - Real polaroid cards with washi tape accents, natural tilts, and handwritten captions.
   - **Click any photo** to open the interactive full-screen **Lightbox Modal** with photo zoom, story snippets, and Next/Previous navigation!

5. **✨ "Why You're So Special To Me" Interactive Flip Cards**:
   - 3D flip cards revealing sweet truths on hover or mobile tap.

6. **🎵 Romantic Background Music Player**:
   - Floating corner widget styled as a spinning vinyl record.
   - Includes Play/Pause button, vinyl spinning animation, and built-in graceful audio fallback so music plays reliably on all browsers.

7. **🎉 Grand Celebration Surprise**:
   - "Click For A Special Surprise" button triggering heart confetti explosions and a sweet pop-up anniversary toast.

---

## 🚀 How to View the Website

Simply **double-click** `index.html` to open it in any web browser (Chrome, Safari, Edge, Firefox)!

You can also send it to Raie or host it for free on **GitHub Pages**, **Vercel**, or **Netlify** by dropping this folder into their deploy dashboard.

---

## 📷 How to Add Your Own Photos & Music

### Adding Real Photos:
1. Place your favorite photos of you and Raie inside the `assets/images/` folder (e.g. `photo1.jpg`, `photo2.jpg`, etc.).
2. In `index.html`, find the `<div class="gallery-grid">` section (around Line 180) and change the `src` attribute of the `<img>` tags to point to your photos:
   ```html
   <img src="assets/images/photo1.jpg" alt="First Date" class="polaroid-img">
   ```
3. You can also customize the `data-caption` and `data-story` text on each polaroid card!

### Changing the Song:
1. Save your favorite romantic song as an MP3 file named `our-song.mp3`.
2. Place it into the `assets/music/` folder (`assets/music/our-song.mp3`).
3. Refresh the website in your browser!

---
Made with ❤️ by Dhruv

# Top Trumps with GSAP Animations

This project is a digital version of the classic Top Trumps card game, now enhanced with GSAP-powered UI polish.

## 🎮 Features
- 4 Different Decks: SciFi Vessels, Fierce Creatures, Dinosaurs, British Monarchs
- Classic Top Trumps gameplay
- Responsive, mobile-friendly layout
- **GSAP-powered entrance and button effects** for a modern, interactive feel
- CSS-powered 3D card flip for the CPU card (robust and hardware-accelerated)

## 🚀 How to Run

### Option 1: Live Server (Recommended)
1. Install the "Live Server" extension in Cursor/VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"
4. The game will open in your browser at `http://localhost:5500`

### Option 2: Direct Browser
1. Double-click `index.html` to open in your browser
2. Note: Some features may not work due to browser security restrictions

### Option 3: Node.js HTTP Server
```bash
npx http-server -p 8080
```
Then visit `http://localhost:8080`

## ✨ GSAP Animations Used
- **Welcome Modal Entrance:** Slides in and fades in on page load
- **Button Hover/Click Effects:** All `.btn` and `.categoryBtn` buttons scale, glow, and animate smoothly on hover and click
- **(Not used for card flip):** The card flip is handled by CSS for best performance and reliability

## 🛠️ Technical Implementation

### File Structure
```
├── index.html              # Main HTML file
├── css/style.css           # Styling and responsive layout
├── js/
│   ├── app.js             # Main game logic
│   ├── decks.js           # Card data and deck definitions
│   └── gsap-animations.js # GSAP animation functions (entrance, buttons)
└── Assets/Images/         # Card images for all decks
```

### GSAP Integration
- **CDN Loading:** GSAP loaded from CDN for easy setup
- **Button and entrance effects only:** No GSAP for card flip (CSS is more robust for 3D flip)
- **Clean, maintainable code:** Only relevant animation code is included

## 🎮 How to Play
1. **Select a Deck:** Choose from SciFi Vessels, Fierce Creatures, Dinosaurs, or British Monarchs
2. **Start Game:** Click "Start Game" to shuffle and deal cards
3. **Choose Category:** Click on a category button on your card
4. **Compare Values:** Higher value wins the round
5. **Win Cards:** Winner takes both cards
6. **Continue:** Click "Next Hand" to play the next round
7. **Win the Game:** Be the last player with cards!

## 📱 Browser Compatibility
- Modern browsers with ES6+ support
- GSAP 3.12.2+ required (via CDN)
- Responsive design for mobile and desktop

## 📝 Notes
- The card flip is handled by CSS for best performance and cross-browser support.
- GSAP is used for UI polish: entrance and button effects.
- For more advanced GSAP animation (e.g., sequenced card flips), see the GSAP docs.

Enjoy your enhanced Top Trumps experience with smooth GSAP-powered UI! 🎉 
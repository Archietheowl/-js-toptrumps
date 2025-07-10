# Top Trumps with GSAP Animations

This project is a digital version of the classic Top Trumps card game enhanced with smooth GSAP animations.

## 🎮 Game Features

- **4 Different Decks**: SciFi Vessels, Fierce Creatures, Dinosaurs, British Monarchs
- **Smooth Animations**: Card flips, reveals, winner celebrations, and more
- **Interactive UI**: Hover effects, button animations, and responsive design
- **Classic Gameplay**: Compare categories, win cards, be the last player standing

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

## 🎨 GSAP Animations Added

### Page Load Animations
- Welcome box slides in from top
- Deck selection dropdown scales in with bounce effect
- Start button appears with elastic animation

### Card Animations
- **Card Reveal**: Cards slide in from left and right with rotation
- **Card Flip**: Smooth 3D flip animation for CPU card
- **Shuffle Effect**: Cards rotate and scale during shuffle
- **Data Reveal**: Card information fades in with stagger effect

### Interactive Animations
- **Category Buttons**: Hover effects with scale and color changes
- **Button Clicks**: Scale down effect on all buttons
- **Winner Celebration**: Winning card scales up with sparkle effect
- **Message Animations**: Smooth fade transitions for game messages

### Game Flow Animations
- **Start Game**: Shuffle animation followed by card reveal
- **Round Results**: Winner animations with visual feedback
- **Game Over**: Container scales down with final message highlight

## 🛠️ Technical Implementation

### Files Structure
```
├── index.html              # Main HTML file
├── css/style.css           # Styling
├── js/
│   ├── app.js             # Main game logic
│   ├── decks.js           # Card data and deck definitions
│   └── gsap-animations.js # GSAP animation functions
└── Assets/Images/         # Card images for all decks
```

### GSAP Integration
- **CDN Loading**: GSAP loaded from CDN for easy setup
- **Modular Design**: Animations separated into dedicated file
- **Fallback Support**: Animations gracefully degrade if GSAP fails to load
- **Performance Optimized**: Uses GSAP's efficient animation engine

## 🎯 Animation Examples

### Card Flip Animation
```javascript
gsap.to(computerCard, {
    duration: 0.6,
    rotationY: 180,
    ease: 'power2.inOut'
});
```

### Winner Celebration
```javascript
gsap.to(winnerCard, {
    duration: 0.5,
    scale: 1.1,
    rotation: 5,
    ease: 'power2.out',
    yoyo: true,
    repeat: 2
});
```

### Staggered Data Reveal
```javascript
gsap.fromTo(cardDataElements,
    { opacity: 0, y: 20 },
    {
        duration: 0.5,
        opacity: 1,
        y: 0,
        stagger: 0.1,
        ease: 'power2.out'
    }
);
```

## 🎮 How to Play

1. **Select a Deck**: Choose from SciFi Vessels, Fierce Creatures, Dinosaurs, or British Monarchs
2. **Start Game**: Click "Start Game" to shuffle and deal cards
3. **Choose Category**: Click on a category button on your card
4. **Compare Values**: Higher value wins the round
5. **Win Cards**: Winner takes both cards
6. **Continue**: Click "Next Hand" to play the next round
7. **Win the Game**: Be the last player with cards!

## 🔧 Customization

You can easily modify animations by editing `js/gsap-animations.js`:

- **Duration**: Change animation speed
- **Easing**: Modify animation curves
- **Effects**: Add new visual effects
- **Timing**: Adjust animation delays and sequences

## 📱 Browser Compatibility

- Modern browsers with ES6+ support
- GSAP 3.12.2+ required
- Responsive design for mobile and desktop

Enjoy your enhanced Top Trumps experience with smooth GSAP animations! 🎉 
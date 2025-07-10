// GSAP Animations for Top Trumps Game
// This file contains all animation logic for the Top Trumps app using GSAP.

// On DOMContentLoaded, set initial states and trigger entrance animations
// Only animates the welcome box and start button (not the dropdown)
document.addEventListener('DOMContentLoaded', () => {
    // Set initial state: welcome box above and invisible, start button small and invisible
    gsap.set('.how-to-play-box', { y: -50, opacity: 0 });
    gsap.set('#start-game', { scale: 0.8, opacity: 0 });
    // Animate after DOM settles
    setTimeout(() => {
        initializeAnimations();
        initializeButtonAnimations();
    }, 100);
});

/**
 * Animates the welcome modal sliding in from the top and fading in.
 */
function initializeAnimations() {
    gsap.to('.how-to-play-box', {
        duration: 1,
        y: 0,
        opacity: 1,
        ease: 'power2.out'
    });
}

/**
 * Adds GSAP-powered hover and click effects to all .btn and .categoryBtn buttons.
 */
function initializeButtonAnimations() {
    const buttons = document.querySelectorAll('.btn, .categoryBtn');
    buttons.forEach(btn => {
        // Hover effect
        btn.addEventListener('mouseenter', () => {
            gsap.to(btn, {
                duration: 0.18,
                scale: 1.08,
                boxShadow: '0 0 8px #b657ff',
                backgroundColor: '#ffd700',
                color: '#222',
                ease: 'power2.out'
            });
        });
        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                duration: 0.18,
                scale: 1,
                boxShadow: '0 0 0px #0000',
                backgroundColor: '',
                color: '',
                ease: 'power2.out'
            });
        });
        // Click effect
        btn.addEventListener('mousedown', () => {
            gsap.to(btn, {
                duration: 0.12,
                scale: 0.95,
                ease: 'power2.in'
            });
        });
        btn.addEventListener('mouseup', () => {
            gsap.to(btn, {
                duration: 0.12,
                scale: 1.08,
                ease: 'power2.out'
            });
        });
        btn.addEventListener('mouseout', () => {
            gsap.to(btn, {
                duration: 0.12,
                scale: 1,
                ease: 'power2.out'
            });
        });
    });
}

/**
 * (Stub) Animate CPU card flip. (Currently handled by CSS)
 */
function animateCardFlip() {}

/**
 * (Stub) Animate both cards entering the play area. (Not implemented yet)
 */
function animateCardReveal() {}

/**
 * (Stub) Animate category button hover/click. (Not implemented yet)
 */
function initializeCategoryAnimations() {}

/**
 * (Stub) Animate winner card celebration. (Not implemented yet)
 */
function animateWinner() {}

/**
 * (Stub) Animate card data reveal. (Not implemented yet)
 */
function animateCardData() {}

/**
 * Animate message box content change (currently just sets innerHTML).
 * @param {string} message - The message to display.
 */
function animateMessage(message) {
    const messageBox = document.querySelector('#message');
    messageBox.innerHTML = message;
}

/**
 * Animate a button press with a quick scale down and up.
 * @param {string} buttonId - The id of the button to animate.
 */
function animateButton(buttonId) {
    const button = document.getElementById(buttonId);
    gsap.to(button, {
        duration: 0.2,
        scale: 0.95,
        ease: 'power2.in',
        yoyo: true,
        repeat: 1
    });
}

/**
 * Animate the start button scaling in with a bounce when it appears.
 */
function animateStartButtonAppear() {
    const startButton = document.getElementById('start-game');
    gsap.to(startButton, {
        duration: 0.8,
        scale: 1,
        opacity: 1,
        ease: 'back.out(1.7)'
    });
}

/**
 * (Stub) Animate card shuffle. (Not implemented yet)
 */
function animateShuffle() {}

/**
 * (Stub) Animate game over state. (Not implemented yet)
 */
function animateGameOver() {}

/**
 * Animate the welcome box fading out and sliding up when starting the game.
 * Returns a Promise that resolves when the animation completes.
 * @returns {Promise<void>}
 */
function fadeOutWelcomeBox() {
    return new Promise((resolve) => {
        gsap.to('.how-to-play-box', {
            duration: 0.5,
            opacity: 0,
            y: -30,
            ease: 'power2.in',
            onComplete: resolve
        });
    });
}

// Export all animation functions for use in app.js
window.GSAPAnimations = {
    initializeAnimations,
    animateCardFlip,
    animateCardReveal,
    initializeCategoryAnimations,
    animateWinner,
    animateCardData,
    animateMessage,
    animateButton,
    animateShuffle,
    animateGameOver,
    fadeOutWelcomeBox,
    animateStartButtonAppear
}; 
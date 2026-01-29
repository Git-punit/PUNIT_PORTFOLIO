// Matrix Effect
const canvas = document.getElementById('matrix-bg');
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

// Configuration for drops
let columns = [];
const initMatrix = () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;

    const columnCount = Math.floor(width / 20); // Base spacing
    columns = [];

    for (let i = 0; i < columnCount; i++) {
        columns.push({
            x: i * 20,
            y: Math.random() * height,
            // Random size between 10px and 22px (Small to Bigger)
            size: Math.floor(Math.random() * 14) + 10,
            // Speed linked to size for depth effect + random direction (Up and Down)
            speed: (Math.random() * 2 + 1) * (Math.random() > 0.5 ? 1 : -1)
        });
    }
};

const chars = '01';

function matrix() {
    ctx.fillStyle = 'rgba(11, 11, 11, 0.1)'; // Slightly more trail
    ctx.fillRect(0, 0, width, height);

    columns.forEach(col => {
        // Pick char
        const char = chars[Math.floor(Math.random() * chars.length)];

        // Set style based on size
        ctx.font = `${col.size}px monospace`;

        // Random brightness/color
        // Bright green for emphasis, darker for background
        const isBright = Math.random() > 0.95;
        ctx.fillStyle = isBright ? '#4dff4d' : '#143320';

        if (isBright) {
            ctx.shadowBlur = 5;
            ctx.shadowColor = '#4dff4d';
        } else {
            ctx.shadowBlur = 0;
        }

        ctx.fillText(char, col.x, col.y);

        // Update position
        col.y += col.speed;

        // Reset if out of bounds
        // If moving down (speed > 0)
        if (col.speed > 0 && col.y > height) {
            col.y = -20;
        }
        // If moving up (speed < 0)
        else if (col.speed < 0 && col.y < -20) {
            col.y = height + 20;
        }
    });

    ctx.shadowBlur = 0; // Reset
}

// Initialize and start
initMatrix();
setInterval(matrix, 50);

// Handle Resize
window.addEventListener('resize', initMatrix);


// Typewriter Effect
const textElement = document.getElementById('typewriter');
const phrases = ['Software Developer_', 'Java Developer_', 'Full Stack Engineer_'];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function type() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
        textElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50; // Deleting speed
    } else {
        textElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100; // Typing speed
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        // Finished typing phrase
        isDeleting = true;
        typeSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        // Finished deleting
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500; // Pause before next
    }

    setTimeout(type, typeSpeed);
}

document.addEventListener('DOMContentLoaded', type);


// Mobile Menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    // We didn't add the active class styles to CSS yet, let's just toggle display via style or add a class
    // Simple inline toggle for now or checking styles
    if (navLinks.style.display === 'flex') {
        navLinks.style.display = 'none';
        navLinks.style.position = 'static';
        navLinks.style.height = 'auto';
        navLinks.style.backgroundColor = 'transparent';
    } else {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '70px';
        navLinks.style.right = '0';
        navLinks.style.width = '100%';
        navLinks.style.backgroundColor = 'rgba(11, 11, 11, 0.95)';
        navLinks.style.padding = '2rem';
        navLinks.style.alignItems = 'center';
    }
});

// Smooth Scroll for anchor links
// Smooth Scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
            // Close mobile menu if open
            if (window.innerWidth <= 968) {
                navLinks.style.display = 'none';
            }
        }
    });
});

// Flip Card on Scroll logic
const flipCardInner = document.querySelector('.flip-card-inner');

if (flipCardInner) {
    window.addEventListener('scroll', () => {
        // Calculate flip based on scroll position
        // If user scrolls down 100px, flip the card
        if (window.scrollY > 100) {
            flipCardInner.classList.add('flipped');
        } else {
            flipCardInner.classList.remove('flipped');
        }
    });
}

// Skill Tags Interaction
const skillTags = document.querySelectorAll('.tags span');

skillTags.forEach(tag => {
    tag.addEventListener('click', () => {
        // Toggle active class
        tag.classList.toggle('active');

        // set percentage for the progress bar animation
        if (tag.classList.contains('active')) {
            const range = tag.getAttribute('data-range');
            tag.style.setProperty('--range-width', range);
        } else {
            tag.style.removeProperty('--range-width');
        }
    });
});


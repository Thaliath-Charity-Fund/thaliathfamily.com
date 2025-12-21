/**
 * Main JavaScript file for handling header scroll effects, mobile menu toggle,
 * navigation link clicks, and smooth scrolling for anchor links.
 */

// Utility function to throttle function calls
function throttle(func, limit) {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
}

// Cache DOM elements
const header = document.getElementById('header');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

// Handle header scroll effect with throttling for performance
function handleScroll() {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

// Add scroll event listener only if header exists
if (header) {
    window.addEventListener('scroll', throttle(handleScroll, 10));
}

// Handle mobile menu toggle
if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Handle navigation link clicks to close menu
if (navLinks) {
    document.querySelectorAll('.nav-links a').forEach((link) => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}

// Handle smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        const target = document.querySelector(href);
        if (target) {
            const offsetTop = target.offsetTop - 88; // Adjust for fixed header height
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth',
            });
        }
    });
});

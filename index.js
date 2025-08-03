document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('header');
    const menuIcon = document.querySelector('.menu-icon');
    const navLinks = document.querySelector('.nav-links');
    const backToTopButton = document.querySelector('.back-to-top');
    const sections = document.querySelectorAll('section[id]');
    const navLi = document.querySelectorAll('.nav-links li a');

    // --- EVENT LISTENERS ---

    // Mobile menu toggle
    if (menuIcon && navLinks) {
        menuIcon.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });

    // Scroll event for header, back-to-top button, and active nav link highlighting
    window.addEventListener('scroll', () => {
        handleHeaderScroll();
        handleBackToTopButton();
        handleNavLinkHighlighting();
    }, { passive: true });

    // --- FUNCTIONS ---

    // Add scrolled class to header
    function handleHeaderScroll() {
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    }

    // Show/hide back-to-top button
    function handleBackToTopButton() {
        if (backToTopButton) {
            if (window.scrollY > 300) {
                backToTopButton.style.display = 'block';
            } else {
                backToTopButton.style.display = 'none';
            }
        }
    }

    // Highlight active nav link on scroll
    function handleNavLinkHighlighting() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 60) {
                current = section.getAttribute('id');
            }
        });

        navLi.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').includes(current)) {
                a.classList.add('active');
            }
        });
    }

    // Initialize ScrollReveal
    if (typeof ScrollReveal !== 'undefined') {
        const sr = ScrollReveal({
            distance: '60px',
            duration: 2000,
            delay: 200,
            reset: false,
            viewFactor: 0.2,
            easing: 'ease-in-out',
        });

        sr.reveal('.section-title, .hero-title, .hero-subtitle, .hero-tagline');
        sr.reveal('.hero-buttons a', { delay: 400, origin: 'bottom' });
        sr.reveal('.about-image', { origin: 'left' });
        sr.reveal('.about-text', { origin: 'right' });
        sr.reveal('.approach-step', { interval: 150, origin: 'bottom' });
        sr.reveal('.skill-card', { interval: 150, origin: 'bottom' });
        sr.reveal('.tools-category', { delay: 200, origin: 'bottom' });
        sr.reveal('.tool-card', { interval: 50, origin: 'bottom' });
        sr.reveal('.work-card', { interval: 150, origin: 'top' });
        sr.reveal('.contact-container-new', { origin: 'bottom' });
    }
});
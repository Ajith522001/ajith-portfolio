document.addEventListener('DOMContentLoaded', () => {

    // --- Sticky Header & Back to Top Button --- //
    const header = document.getElementById('header');
    const backToTopButton = document.querySelector('.back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
            backToTopButton.classList.add('visible');
        } else {
            header.classList.remove('scrolled');
            backToTopButton.classList.remove('visible');
        }
    });

    // --- Mobile Menu --- //
    const menuIcon = document.querySelector('.menu-icon');
    const navLinks = document.querySelector('.nav-links');

    menuIcon.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });

    // --- Testimonial Slider --- //
    const testimonials = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.slider-nav .prev');
    const nextBtn = document.querySelector('.slider-nav .next');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        testimonials.forEach((card, i) => {
            card.classList.remove('active');
            if (i === index) {
                card.classList.add('active');
            }
        });
    }

    nextBtn.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    });

    prevBtn.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentTestimonial);
    });

    // --- Portfolio Filter --- //
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button state
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            // Show/hide portfolio items
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // --- ScrollReveal Animations --- //
    const sr = ScrollReveal({
        distance: '60px',
        duration: 2500,
        delay: 400,
        reset: true
    });

    sr.reveal('.hero-title', { delay: 500 });
    sr.reveal('.hero-subtitle', { delay: 600, origin: 'bottom' });
    sr.reveal('.hero-buttons', { delay: 700, origin: 'bottom' });
    sr.reveal('.section-title', { delay: 200, origin: 'left' });
    sr.reveal('#about .about-image', { delay: 300, origin: 'left' });
    sr.reveal('#about .about-text', { delay: 400, origin: 'right' });
    sr.reveal('.service-card', { interval: 200 });
    sr.reveal('.portfolio-filters', { delay: 200 });
    sr.reveal('.portfolio-grid', { delay: 400, origin: 'bottom' });
    sr.reveal('.testimonial-slider', { delay: 300 });
    sr.reveal('.contact-info', { delay: 300, origin: 'left' });
    sr.reveal('.contact-form', { delay: 400, origin: 'right' });

});

document.addEventListener('DOMContentLoaded', () => {

    // --- Sitewide: Mobile Menu --- //
    const menuIcon = document.querySelector('.menu-icon');
    const navLinks = document.querySelector('.nav-links');
    if (menuIcon && navLinks) {
        menuIcon.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            });
        });
    }

    // --- Homepage Specific Scripts --- //
    if (document.querySelector('.hero-title')) {
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

        // --- Testimonial Slider --- //
        const testimonials = document.querySelectorAll('.testimonial-card');
        const prevBtn = document.querySelector('.slider-nav .prev');
        const nextBtn = document.querySelector('.slider-nav .next');
        if (testimonials.length > 0 && prevBtn && nextBtn) {
            let currentTestimonial = 0;
            const showTestimonial = (index) => {
                testimonials.forEach((card, i) => {
                    card.classList.toggle('active', i === index);
                });
            };
            nextBtn.addEventListener('click', () => {
                currentTestimonial = (currentTestimonial + 1) % testimonials.length;
                showTestimonial(currentTestimonial);
            });
            prevBtn.addEventListener('click', () => {
                currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
                showTestimonial(currentTestimonial);
            });
            showTestimonial(0);
        }

        // --- Homepage Portfolio Filter --- //
        const portfolioFilterBtns = document.querySelectorAll('.portfolio-filters .filter-btn');
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        if (portfolioFilterBtns.length > 0) {
            portfolioFilterBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    portfolioFilterBtns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    const filter = btn.dataset.filter;
                    portfolioItems.forEach(item => {
                        item.style.display = (filter === 'all' || item.dataset.category === filter) ? 'block' : 'none';
                    });
                });
            });
        }

        // --- ScrollReveal Animations --- //
        const sr = ScrollReveal({ distance: '60px', duration: 2500, delay: 400, reset: true });
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
    }

    // --- Work Sample Pages: Lightbox, Filtering, Masonry --- //
    const galleryContainer = document.getElementById('lightgallery');
    if (galleryContainer) {
        const isVideoPage = document.querySelector('.video-grid');
        lightGallery(galleryContainer, {
            selector: isVideoPage ? '.video-card' : '.gallery-item, .grid-item',
            plugins: isVideoPage ? [lgVideo] : [lgThumbnail],
            thumbnail: !isVideoPage,
            download: false,
            licenseKey: '0000-0000-000-0000'
        });
    }

    const designGrid = document.querySelector('.design-grid');
    let msnry;
    if (designGrid) {
        imagesLoaded(designGrid, () => {
            msnry = new Masonry(designGrid, {
                itemSelector: '.grid-item',
                columnWidth: '.grid-item',
                gutter: 30,
                percentPosition: true
            });
        });
    }

    const filterButtons = document.querySelectorAll('#page-content .filter-btn');
    const gridItems = document.querySelectorAll('#page-content .campaign-card, #page-content .grid-item, #page-content .video-card');
    if (filterButtons.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const filter = btn.dataset.filter;
                gridItems.forEach(item => {
                    const category = item.dataset.category;
                    const shouldShow = (filter === 'all' || category === filter);
                    item.style.display = shouldShow ? 'block' : 'none';
                });
                if (msnry) {
                    msnry.layout();
                }
            });
        });
    }

    // --- Active Nav Link Highlighting for Secondary Pages --- //
    const currentPage = window.location.pathname.split('/').pop();
    if (currentPage) {
        const navPageLinks = document.querySelectorAll('.pages-nav .nav-links a');
        navPageLinks.forEach(link => {
            const linkPage = link.getAttribute('href').split('/').pop();
            if (linkPage === currentPage) {
                link.classList.add('active');
            }
        });
    }
});

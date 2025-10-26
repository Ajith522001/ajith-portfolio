document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Detection --- //
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

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
        
        // Throttle scroll events for better mobile performance
        let scrollTimeout;
        const handleScroll = () => {
            if (scrollTimeout) return;
            scrollTimeout = setTimeout(() => {
                if (window.scrollY > 50) {
                    header.classList.add('scrolled');
                    backToTopButton.classList.add('visible');
                } else {
                    header.classList.remove('scrolled');
                    backToTopButton.classList.remove('visible');
                }
                scrollTimeout = null;
            }, isMobile ? 100 : 16); // More aggressive throttling on mobile
        };
        
        window.addEventListener('scroll', handleScroll, { passive: true });

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
        // Use lighter animations on mobile for better performance
        const srConfig = isMobile ? 
            { distance: '30px', duration: 800, delay: 100, reset: true } : 
            { distance: '60px', duration: 2500, delay: 400, reset: true };
        
        const sr = ScrollReveal(srConfig);
        
        if (isMobile) {
            // Simplified animations for mobile
            sr.reveal('.hero-title', { delay: 200 });
            sr.reveal('.hero-subtitle', { delay: 300, origin: 'bottom' });
            sr.reveal('.hero-buttons', { delay: 400, origin: 'bottom' });
            sr.reveal('.section-title', { delay: 100 });
            sr.reveal('#about .about-image', { delay: 150, origin: 'left' });
            sr.reveal('#about .about-text', { delay: 200, origin: 'right' });
            sr.reveal('.service-card', { interval: 100 });
            sr.reveal('.portfolio-filters', { delay: 100 });
            sr.reveal('.portfolio-grid', { delay: 200, origin: 'bottom' });
            sr.reveal('.testimonial-slider', { delay: 150 });
            sr.reveal('.contact-info', { delay: 150, origin: 'left' });
            sr.reveal('.contact-form', { delay: 200, origin: 'right' });
        } else {
            // Full animations for desktop
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
    }

    // --- Work Sample Pages: Lightbox, Filtering, Masonry --- //
    const galleryContainer = document.getElementById('lightgallery');
    if (galleryContainer) {
        const isVideoPage = document.querySelector('.video-grid');
        
        // Optimize lightGallery for mobile
        const lightGalleryConfig = {
            selector: isVideoPage ? '.video-card' : '.gallery-item, .grid-item',
            plugins: isVideoPage ? [lgVideo] : [lgThumbnail],
            thumbnail: !isVideoPage,
            download: false,
            licenseKey: '0000-0000-000-0000'
        };
        
        // Add mobile-specific optimizations
        if (isMobile) {
            lightGalleryConfig.mode = 'lg-fade';
            lightGalleryConfig.speed = 300;
            lightGalleryConfig.preload = 1; // Reduce preloading on mobile
        }
        
        lightGallery(galleryContainer, lightGalleryConfig);
    }

    const designGrid = document.querySelector('.design-grid');
    let msnry;
    if (designGrid) {
        // Optimize masonry for mobile
        const masonryConfig = {
            itemSelector: '.grid-item',
            columnWidth: '.grid-item',
            gutter: isMobile ? 15 : 30, // Smaller gutter on mobile
            percentPosition: true
        };
        
        if (isMobile) {
            // Disable masonry on very small screens to improve performance
            if (window.innerWidth < 480) {
                designGrid.style.display = 'block';
                designGrid.querySelectorAll('.grid-item').forEach(item => {
                    item.style.width = '100%';
                    item.style.marginBottom = '15px';
                });
            } else {
                imagesLoaded(designGrid, () => {
                    msnry = new Masonry(designGrid, masonryConfig);
                });
            }
        } else {
            imagesLoaded(designGrid, () => {
                msnry = new Masonry(designGrid, masonryConfig);
            });
        }
    }

    const filterButtons = document.querySelectorAll('#page-content .filter-btn');
    const gridItems = document.querySelectorAll('#page-content .campaign-card, #page-content .grid-item, #page-content .video-card');
    if (filterButtons.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const filter = btn.dataset.filter;
                
                // Optimize filtering for mobile
                if (isMobile) {
                    // Use requestAnimationFrame for smoother mobile performance
                    requestAnimationFrame(() => {
                        gridItems.forEach(item => {
                            const category = item.dataset.category;
                            const shouldShow = (filter === 'all' || category === filter);
                            item.style.display = shouldShow ? 'block' : 'none';
                        });
                        if (msnry) {
                            msnry.layout();
                        }
                    });
                } else {
                    gridItems.forEach(item => {
                        const category = item.dataset.category;
                        const shouldShow = (filter === 'all' || category === filter);
                        item.style.display = shouldShow ? 'block' : 'none';
                    });
                    if (msnry) {
                        msnry.layout();
                    }
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

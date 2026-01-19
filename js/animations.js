/* ============================================
   SCROLL ANIMATIONS JAVASCRIPT
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    // ============================================
    // INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
    // ============================================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
                
                // Add stagger animation to children if needed
                if (entry.target.classList.contains('stagger-animation')) {
                    entry.target.classList.add('animate');
                }
            }
        });
    }, observerOptions);

    // Observe all elements with data-aos attribute
    document.querySelectorAll('[data-aos]').forEach(element => {
        animationObserver.observe(element);
    });

    // ============================================
    // PARALLAX EFFECT
    // ============================================
    const parallaxElements = document.querySelectorAll('.parallax');
    
    function handleParallax() {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }

    if (parallaxElements.length > 0) {
        window.addEventListener('scroll', handleParallax);
    }

    // ============================================
    // SCROLL PROGRESS INDICATOR
    // ============================================
    function createScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.innerHTML = '<div class="scroll-progress-bar"></div>';
        document.body.appendChild(progressBar);

        const style = document.createElement('style');
        style.textContent = `
            .scroll-progress {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 3px;
                background: transparent;
                z-index: 9999;
            }
            .scroll-progress-bar {
                height: 100%;
                background: linear-gradient(90deg, #d65a31, #ff7a4d);
                width: 0%;
                transition: width 0.1s ease;
            }
        `;
        document.head.appendChild(style);

        window.addEventListener('scroll', function() {
            const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = (window.pageYOffset / windowHeight) * 100;
            progressBar.querySelector('.scroll-progress-bar').style.width = scrolled + '%';
        });
    }

    createScrollProgress();

    // ============================================
    // REVEAL ON SCROLL
    // ============================================
    function revealOnScroll() {
        const reveals = document.querySelectorAll('.reveal');
        
        reveals.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const revealPoint = 150;
            
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('revealed');
            }
        });
    }

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check

    // ============================================
    // TYPING EFFECT
    // ============================================
    function typeWriter(element, text, speed = 50) {
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // ============================================
    // NUMBER COUNTER ON SCROLL
    // ============================================
    const counters = document.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const targetNumber = parseInt(target.dataset.target);
                const duration = parseInt(target.dataset.duration) || 2000;
                
                animateValue(target, 0, targetNumber, duration);
                counterObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    function animateValue(element, start, end, duration) {
        const range = end - start;
        const increment = end > start ? 1 : -1;
        const stepTime = Math.abs(Math.floor(duration / range));
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            element.textContent = current;
            
            if (current === end) {
                clearInterval(timer);
            }
        }, stepTime);
    }

    // ============================================
    // MAGNETIC BUTTON EFFECT
    // ============================================
    const magneticButtons = document.querySelectorAll('.btn-primary, .btn-search');
    
    magneticButtons.forEach(button => {
        button.addEventListener('mousemove', function(e) {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        });
        
        button.addEventListener('mouseleave', function() {
            button.style.transform = 'translate(0, 0)';
        });
    });

    // ============================================
    // TILT EFFECT FOR CARDS
    // ============================================
    const tiltCards = document.querySelectorAll('.scooter-card');
    
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });

    // ============================================
    // SMOOTH SECTION TRANSITIONS
    // ============================================
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '-50px'
    });

    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        sectionObserver.observe(section);
    });

    // First section should be visible immediately
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.style.opacity = '1';
        heroSection.style.transform = 'translateY(0)';
    }

    // ============================================
    // CURSOR FOLLOW EFFECT (Optional)
    // ============================================
    function createCursorFollow() {
        // Only for desktop
        if (window.innerWidth < 992) return;

        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        
        const cursorDot = document.createElement('div');
        cursorDot.className = 'cursor-dot';
        
        document.body.appendChild(cursor);
        document.body.appendChild(cursorDot);

        const style = document.createElement('style');
        style.textContent = `
            .custom-cursor {
                position: fixed;
                width: 30px;
                height: 30px;
                border: 2px solid #d65a31;
                border-radius: 50%;
                pointer-events: none;
                transform: translate(-50%, -50%);
                transition: transform 0.15s ease, width 0.2s ease, height 0.2s ease;
                z-index: 9998;
                display: none;
            }
            .cursor-dot {
                position: fixed;
                width: 6px;
                height: 6px;
                background: #d65a31;
                border-radius: 50%;
                pointer-events: none;
                transform: translate(-50%, -50%);
                z-index: 9999;
                display: none;
            }
            body:hover .custom-cursor,
            body:hover .cursor-dot {
                display: block;
            }
            .custom-cursor.hover {
                width: 50px;
                height: 50px;
                background: rgba(214, 90, 49, 0.1);
            }
        `;
        document.head.appendChild(style);

        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorDot.style.left = mouseX + 'px';
            cursorDot.style.top = mouseY + 'px';
        });

        function animateCursor() {
            cursorX += (mouseX - cursorX) * 0.1;
            cursorY += (mouseY - cursorY) * 0.1;
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // Hover effect on interactive elements
        document.querySelectorAll('a, button, .scooter-card').forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });
    }

    // Uncomment to enable custom cursor
    // createCursorFollow();

    // ============================================
    // IMAGE LAZY LOAD WITH FADE
    // ============================================
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.src = img.dataset.src;
                
                img.onload = () => {
                    img.style.transition = 'opacity 0.5s ease';
                    img.style.opacity = '1';
                };
                
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));

    // ============================================
    // SCROLL SNAP ENHANCEMENT
    // ============================================
    let isScrolling = false;
    let scrollTimeout;

    function handleScrollEnd() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            isScrolling = false;
        }, 100);
    }

    window.addEventListener('scroll', () => {
        isScrolling = true;
        handleScrollEnd();
    });
});

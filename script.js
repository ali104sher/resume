/* ========== NAVBAR MOBILE TOGGLE ========== */
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');

if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        const icon = menuBtn.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        }
    });

    navLinks.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            const icon = menuBtn.querySelector('i');
            if (icon) {
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            }
        });
    });
}

/* ========== STICKY NAVBAR SHADOW ========== */
const navbar = document.getElementById('navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.35)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });
}

/* ========== DYNAMIC PHOTO GALLERY ========== */
(function buildGallery() {
    const gallery = document.getElementById('photo-gallery');
    if (!gallery) return;

    const MAX_IMAGES = 12;

    // Setup Intersection Observer for fade-in
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('loaded');
                }
            });
        },
        { threshold: 0.1 }
    );

    for (let i = 1; i <= MAX_IMAGES; i++) {
        const img = document.createElement('img');
        
        // Cache buster so the browser always tries to load the new file
        img.src = `${i}.jpg?v=${new Date().getTime()}`;
        img.alt = `Award & moment ${i}`;
        img.loading = 'lazy';

        img.onerror = function () {
            this.style.display = 'none';
            observer.unobserve(this);
        };

        img.onload = function () {
            observer.observe(this);
        };

        gallery.appendChild(img);
    }
})();

/* ========== SMOOTH SCROLL OFFSET ========== */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            const navHeight = navbar ? navbar.offsetHeight : 70;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

/* ========== REVEAL ANIMATIONS ON SCROLL ========== */
(function revealOnScroll() {
    // Added the new sections to the reveal animation
    const revealElements = document.querySelectorAll(
        '.timeline-card, .achievement-card, .contact-item, .value-card, .testimonial-card, .skill-badge'
    );

    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1 }
    );

    revealElements.forEach((el) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(24px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        revealObserver.observe(el);
    });
})();
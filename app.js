document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileClose = document.getElementById('mobileClose');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileOverlay = document.getElementById('mobileOverlay');

    // Navbar scroll
    window.addEventListener('scroll', () => {
        navbar && navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    // Mobile menu
    function openMenu() {
        mobileMenu && mobileMenu.classList.add('open');
        mobileOverlay && mobileOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    }
    function closeMenu() {
        mobileMenu && mobileMenu.classList.remove('open');
        mobileOverlay && mobileOverlay.classList.remove('open');
        document.body.style.overflow = '';
    }
    mobileToggle && mobileToggle.addEventListener('click', openMenu);
    mobileClose && mobileClose.addEventListener('click', closeMenu);
    mobileOverlay && mobileOverlay.addEventListener('click', closeMenu);
    document.querySelectorAll('.mobile-links a, .mobile-bottom a').forEach(a => {
        a.addEventListener('click', closeMenu);
    });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const id = this.getAttribute('href');
            if (id !== '#' && id.startsWith('#')) {
                const el = document.querySelector(id);
                if (el) {
                    e.preventDefault();
                    const offset = navbar ? navbar.offsetHeight : 0;
                    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
                }
            }
        });
    });

    // Reveal on scroll
    const reveals = document.querySelectorAll('.reveal');
    if (reveals.length) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });
        reveals.forEach(el => io.observe(el));
    }

    // Stats counter
    const stats = document.querySelectorAll('.stat-number[data-target]');
    if (stats.length) {
        let counted = false;
        const countUp = () => {
            if (counted) return;
            counted = true;
            stats.forEach(stat => {
                const target = +stat.dataset.target;
                const duration = 1500;
                const step = target / (duration / 16);
                let current = 0;
                const tick = () => {
                    current += step;
                    if (current >= target) {
                        stat.textContent = target;
                    } else {
                        stat.textContent = Math.floor(current);
                        requestAnimationFrame(tick);
                    }
                };
                tick();
            });
        };
        const sIO = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) countUp();
        }, { threshold: 0.3 });
        const bar = document.querySelector('.stats-bar');
        bar && sIO.observe(bar);
    }

    // Contact form handler
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('formName').value;
            const email = document.getElementById('formEmail').value;
            const phone = document.getElementById('formPhone').value;
            const service = document.getElementById('formService').value;
            const message = document.getElementById('formMessage').value;
            const text = `Hi! I'm ${name}.%0A%0AService: ${service}%0AEmail: ${email}%0APhone: ${phone}%0A%0A${message}`;
            window.open(`https://wa.me/34603350830?text=${text}`, '_blank');
        });
    }
});

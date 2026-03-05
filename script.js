document.addEventListener('DOMContentLoaded', function () {

    // ---- AOS (Animate On Scroll) ----
    AOS.init({
        duration: 700,
        easing: 'ease-out-quart',
        once: true,
        offset: 60,
    });

    // ---- Typed.js ----
    new Typed('#typing-effect', {
        strings: [
            'resilient cloud systems.',
            'automated CI/CD pipelines.',
            'scalable infrastructure.',
            'zero-downtime deployments.',
            'GitOps-driven platforms.',
        ],
        typeSpeed: 45,
        backSpeed: 25,
        backDelay: 2500,
        loop: true,
    });

    // ---- Sticky Header on scroll ----
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ---- Active nav link highlight ----
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + entry.target.id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { threshold: 0.4, rootMargin: '-60px 0px -40% 0px' });
    sections.forEach(s => observer.observe(s));

    // ---- Mobile Menu ----
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = mobileMenuBtn.querySelector('i');

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        menuIcon.classList.toggle('fa-bars');
        menuIcon.classList.toggle('fa-xmark');
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            menuIcon.classList.add('fa-bars');
            menuIcon.classList.remove('fa-xmark');
        });
    });

    // ---- Back to Top ----
    const backToTop = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ---- Footer Year ----
    document.getElementById('year').textContent = new Date().getFullYear();

    // ---- Particle Canvas (optimized for performance) ----
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animFrame;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    // Debounce resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(resizeCanvas, 200);
    });

    // Reduce particle count: 40 instead of 80 (halves O(n²) connection checks)
    function createParticle() {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
            r: Math.random() * 1.5 + 0.5,
            alpha: Math.random() * 0.4 + 0.1,
        };
    }
    for (let i = 0; i < 40; i++) particles.push(createParticle());

    // Connection distance reduced to 90px (down from 120) — drastically fewer checks per frame
    const MAX_DIST = 90;
    const MAX_DIST_SQ = MAX_DIST * MAX_DIST;

    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Update positions
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0) p.x = canvas.width;
            else if (p.x > canvas.width) p.x = 0;
            if (p.y < 0) p.y = canvas.height;
            else if (p.y > canvas.height) p.y = 0;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(99,218,255,${p.alpha})`;
            ctx.fill();
        }

        // Draw connections — use squared distance to avoid sqrt per pair
        ctx.lineWidth = 0.5;
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distSq = dx * dx + dy * dy;
                if (distSq < MAX_DIST_SQ) {
                    const alpha = 0.07 * (1 - Math.sqrt(distSq) / MAX_DIST);
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(99,218,255,${alpha})`;
                    ctx.stroke();
                }
            }
        }
        animFrame = requestAnimationFrame(drawParticles);
    }

    // Start particles only after page load to not compete with LCP
    window.addEventListener('load', () => {
        // Use requestIdleCallback if available so particles never block critical work
        if ('requestIdleCallback' in window) {
            requestIdleCallback(() => drawParticles(), { timeout: 2000 });
        } else {
            setTimeout(drawParticles, 500);
        }
    });

    // Pause when tab hidden
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            cancelAnimationFrame(animFrame);
        } else {
            drawParticles();
        }
    });

    // ---- Smooth scroll for all anchor links ----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const top = target.getBoundingClientRect().top + window.scrollY - 72;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // ---- Subtle parallax on hero ----
    const heroContent = document.querySelector('.hero-content');
    window.addEventListener('scroll', () => {
        if (heroContent && window.scrollY < window.innerHeight) {
            const offset = window.scrollY * 0.15;
            heroContent.style.transform = `translateY(${offset}px)`;
        }
    });

});

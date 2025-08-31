document.addEventListener('DOMContentLoaded', function () {
    // --- Initialize Animate On Scroll (AOS) ---
    AOS.init({
        duration: 800, // values from 0 to 3000, with step 50ms
        easing: 'ease-in-out', // default easing for AOS animations
        once: true, // whether animation should happen only once - while scrolling down
    });

    // --- Initialize Typed.js for the Hero Section Typing Effect ---
    new Typed('#typing-effect', {
        strings: ['resilient cloud systems.', 'robust CI/CD pipelines.', 'scalable infrastructure.'],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        loop: true,
    });

    // --- Mobile Menu Toggle ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = mobileMenuBtn.querySelector('i');

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        if (mobileMenu.classList.contains('hidden')) {
            menuIcon.classList.remove('fa-xmark');
            menuIcon.classList.add('fa-bars');
        } else {
            menuIcon.classList.remove('fa-bars');
            menuIcon.classList.add('fa-xmark');
        }
    });

    // Close mobile menu when a link is clicked
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            menuIcon.classList.remove('fa-xmark');
            menuIcon.classList.add('fa-bars');
        });
    });

    // --- Back to Top Button ---
    const backToTopButton = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.remove('hidden');
            backToTopButton.classList.add('flex');
        } else {
            backToTopButton.classList.remove('flex');
            backToTopButton.classList.add('hidden');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // --- Set current year in footer ---
    document.getElementById('year').textContent = new Date().getFullYear();
});

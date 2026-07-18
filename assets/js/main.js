// Language translations object
const translations = {
    en: {
        navHome: 'Home',
        navServices: 'Services',
        navPortfolio: 'Portfolio',
        navContact: 'Contact',
        navAbout: 'About',
        navPricing: 'Pricing',
        navFaq: 'FAQ',
        heroTitle: 'Complete Digital Solutions',
        heroSubtitle: 'We help small businesses build, grow, and maintain a professional online presence.',
        heroCTA1: 'Get Started',
        heroCTA2: 'View Services',
        mobileMenuToggle: 'Menu',
        footerCopyright: '© 2026 Sum Web Dev. All rights reserved.',
    },
    nl: {
        navHome: 'Home',
        navServices: 'Diensten',
        navPortfolio: 'Portfolio',
        navContact: 'Contact',
        navAbout: 'Over ons',
        navPricing: 'Prijzen',
        navFaq: 'Veelgestelde vragen',
        heroTitle: 'Volledige digitale oplossingen',
        heroSubtitle: 'We helpen kleine bedrijven een professionele online aanwezigheid op te bouwen en groeien.',
        heroCTA1: 'Aan de slag',
        heroCTA2: 'Bekijk diensten',
        mobileMenuToggle: 'Menu',
        footerCopyright: '© 2026 Sum Web Dev. Alle rechten voorbehouden.',
    },
    fr: {
        navHome: 'Accueil',
        navServices: 'Services',
        navPortfolio: 'Portfolio',
        navContact: 'Contact',
        navAbout: 'À propos',
        navPricing: 'Tarification',
        navFaq: 'FAQ',
        heroTitle: 'Solutions numériques complètes',
        heroSubtitle: 'Nous aidons les petites entreprises à créer, développer et maintenir une présence en ligne professionnelle.',
        heroCTA1: 'Commencer',
        heroCTA2: 'Voir les services',
        mobileMenuToggle: 'Menu',
        footerCopyright: '© 2026 Sum Web Dev. Tous les droits réservés.',
    },
    es: {
        navHome: 'Inicio',
        navServices: 'Servicios',
        navPortfolio: 'Portafolio',
        navContact: 'Contacto',
        navAbout: 'Acerca de',
        navPricing: 'Precios',
        navFaq: 'Preguntas frecuentes',
        heroTitle: 'Soluciones digitales completas',
        heroSubtitle: 'Ayudamos a pequeñas empresas a crear, crecer y mantener una presencia en línea profesional.',
        heroCTA1: 'Comenzar',
        heroCTA2: 'Ver servicios',
        mobileMenuToggle: 'Menú',
        footerCopyright: '© 2026 Sum Web Dev. Todos los derechos reservados.',
    },
    pt: {
        navHome: 'Início',
        navServices: 'Serviços',
        navPortfolio: 'Portfólio',
        navContact: 'Contato',
        navAbout: 'Sobre',
        navPricing: 'Preços',
        navFaq: 'Perguntas Frequentes',
        heroTitle: 'Soluções digitais completas',
        heroSubtitle: 'Ajudamos pequenas empresas a construir, crescer e manter uma presença on-line profissional.',
        heroCTA1: 'Começar',
        heroCTA2: 'Ver serviços',
        mobileMenuToggle: 'Menu',
        footerCopyright: '© 2026 Sum Web Dev. Todos os direitos reservados.',
    }
};

// Current language state
let currentLanguage = localStorage.getItem('language') || 'en';

// Initialize language on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeLanguage();
    setupScrollAnimations();
    setupMobileMenu();
});

// Initialize language selector
function initializeLanguage() {
    const langSelector = document.getElementById('lang-selector');
    if (langSelector) {
        langSelector.value = currentLanguage;
    }
    updateLanguage(currentLanguage);
}

// Switch language function
function switchLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    updateLanguage(lang);
}

// Update all text based on selected language
function updateLanguage(lang) {
    const trans = translations[lang] || translations['en'];
    
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (trans[key]) {
            element.textContent = trans[key];
        }
    });
}

// Scroll reveal animation
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('[data-scroll-reveal]').forEach(el => {
        observer.observe(el);
    });
}

// Mobile menu toggle
function setupMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });

        // Close menu when clicking on a link
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
            });
        });
    }
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Counter animation for statistics
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// Trigger counter animations when they come into view
const counterObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            const target = parseInt(entry.target.getAttribute('data-target')) || 0;
            animateCounter(entry.target, target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('[data-counter]').forEach(el => {
    counterObserver.observe(el);
});

// Form validation helper
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Active link indicator for navigation
function setActiveNavLink() {
    const currentPath = window.location.pathname;
    document.querySelectorAll('nav a[href]').forEach(link => {
        if (link.getAttribute('href') === currentPath || 
            (currentPath === '/' && link.getAttribute('href') === '/')) {
            link.classList.add('border-b-2', 'border-blue-600');
        } else {
            link.classList.remove('border-b-2', 'border-blue-600');
        }
    });
}

// Call on page load
window.addEventListener('load', setActiveNavLink);

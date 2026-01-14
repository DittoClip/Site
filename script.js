// ===== FAQ Accordion =====
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const item = button.parentElement;
        const isActive = item.classList.contains('active');

        // Close all other items
        document.querySelectorAll('.faq-item').forEach(faq => {
            faq.classList.remove('active');
        });

        // Toggle current item
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// ===== Mobile Navigation =====
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
}

// ===== Smooth Scroll for Navigation Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            const navHeight = document.querySelector('.nav').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Navigation Background on Scroll =====
const nav = document.querySelector('.nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        nav.style.boxShadow = '0 1px 12px rgba(0, 0, 0, 0.1)';
    } else {
        nav.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// ===== Animate Elements on Scroll =====
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe feature cards, steps, etc.
document.querySelectorAll('.feature-card, .step, .shortcut-card, .privacy-point').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add animate-in class styles
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// ===== Clipboard Item Hover Effect =====
const clipboardItems = document.querySelectorAll('.clipboard-item');
clipboardItems.forEach((item, index) => {
    item.addEventListener('mouseenter', () => {
        clipboardItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
    });
});

// ===== Keyboard Navigation for App Window Demo =====
let activeIndex = 0;
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        const items = document.querySelectorAll('.clipboard-item');
        if (items.length === 0) return;

        items.forEach(i => i.classList.remove('active'));

        if (e.key === 'ArrowDown') {
            activeIndex = Math.min(activeIndex + 1, items.length - 1);
        } else {
            activeIndex = Math.max(activeIndex - 1, 0);
        }

        items[activeIndex].classList.add('active');
    }
});

// ===== Mobile Menu Styles =====
const mobileStyle = document.createElement('style');
mobileStyle.textContent = `
    @media (max-width: 768px) {
        .nav-links {
            position: fixed;
            top: 64px;
            left: 0;
            right: 0;
            flex-direction: column;
            background: var(--color-bg);
            padding: 24px;
            gap: 16px;
            border-bottom: 1px solid var(--color-bg-tertiary);
            transform: translateY(-100%);
            opacity: 0;
            transition: all 0.3s ease;
            pointer-events: none;
        }

        .nav-links.active {
            display: flex;
            transform: translateY(0);
            opacity: 1;
            pointer-events: auto;
        }

        .nav-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }

        .nav-toggle.active span:nth-child(2) {
            opacity: 0;
        }

        .nav-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(5px, -5px);
        }
    }
`;
document.head.appendChild(mobileStyle);

// ===== Add subtle parallax to hero visual =====
const heroVisual = document.querySelector('.hero-visual');
if (heroVisual) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.3;
        if (scrolled < 600) {
            heroVisual.style.transform = `translateY(${rate}px)`;
        }
    });
}

// ===== Console Easter Egg =====
console.log('%c DittoClip ', 'background: linear-gradient(135deg, #007AFF, #5856D6); color: white; font-size: 24px; padding: 10px 20px; border-radius: 8px; font-weight: bold;');
console.log('%c Never lose a copy again. ', 'color: #6E6E73; font-size: 14px;');
console.log('%c https://github.com/DittoClip ', 'color: #007AFF; font-size: 12px;');

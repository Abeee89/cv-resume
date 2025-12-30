// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.background = 'rgba(0, 0, 0, 0.85)';
        navbar.style.backdropFilter = 'blur(30px) saturate(180%)';
        navbar.style.webkitBackdropFilter = 'blur(30px) saturate(180%)';
        navbar.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.6)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.75)';
        navbar.style.backdropFilter = 'blur(25px) saturate(180%)';
        navbar.style.webkitBackdropFilter = 'blur(25px) saturate(180%)';
        navbar.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.5)';
    }
    
    lastScroll = currentScroll;
});

// Typing Effect for Hero Title
const typingText = document.querySelector('.name');
if (typingText) {
    const originalText = typingText.textContent;
    typingText.textContent = '';
    let charIndex = 0;
    
    function typeWriter() {
        if (charIndex < originalText.length) {
            typingText.textContent += originalText.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 100);
        }
    }
    
    // Start typing after initial animations
    setTimeout(typeWriter, 1000);
}

// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.blog-card, .project-card, .about, .section-header').forEach(el => {
    el.classList.add('observe-element');
    observer.observe(el);
});

// Parallax Effect for Hero Background - Disabled to keep dots in place
const heroBackground = document.querySelector('.hero-background');
if (heroBackground) {
    // Background stays fixed in hero section
}

// Animated Counter for Statistics (if you want to add stats)
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
}

// Card Tilt Effect
document.querySelectorAll('.blog-card, .project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// Active Nav Link on Scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navbar a[href^="#"]');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Cursor Trail Effect (Optional - can be enabled)
let cursorTrail = [];
const maxTrailLength = 20;

document.addEventListener('mousemove', (e) => {
    cursorTrail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
    
    if (cursorTrail.length > maxTrailLength) {
        cursorTrail.shift();
    }
});

// Button Ripple Effect
document.querySelectorAll('.connect-btn, .view-all-btn, .btn, .btn-outline').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Lazy Loading Images
const images = document.querySelectorAll('img[src]');
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.classList.add('loaded');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// Scroll Progress Indicator
const scrollProgress = document.createElement('div');
scrollProgress.className = 'scroll-progress';
document.body.appendChild(scrollProgress);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
});

// Social Icons Animation on Hover
document.querySelectorAll('.social-icons a').forEach(icon => {
    icon.addEventListener('mouseenter', function() {
        this.classList.add('icon-hover');
    });
    
    icon.addEventListener('mouseleave', function() {
        this.classList.remove('icon-hover');
    });
});

// Text Reveal Animation
function revealText(element) {
    const text = element.textContent;
    element.textContent = '';
    element.style.opacity = '1';
    
    text.split('').forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.opacity = '0';
        span.style.animation = `fadeInChar 0.5s ease forwards ${index * 0.03}s`;
        element.appendChild(span);
    });
}

// Initialize on page load
window.addEventListener('load', () => {
    // Add loaded class to body for initial animations
    document.body.classList.add('loaded');
    
    // Reveal section descriptions
    setTimeout(() => {
        document.querySelectorAll('.section-description').forEach(desc => {
            desc.style.opacity = '1';
            desc.style.transform = 'translateY(0)';
        });
    }, 500);
});

// Floating Animation for Hero Image (if you add it back)
const floatingElements = document.querySelectorAll('.hero-img');
floatingElements.forEach(el => {
    let position = 0;
    setInterval(() => {
        position += 0.5;
        el.style.transform = `translateY(${Math.sin(position * 0.05) * 10}px)`;
    }, 50);
});

// Newsletter/Contact Form Animation (if you add forms)
document.querySelectorAll('input, textarea').forEach(field => {
    field.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    field.addEventListener('blur', function() {
        if (!this.value) {
            this.parentElement.classList.remove('focused');
        }
    });
});

// Console Easter Egg
console.log('%c👋 Hi there!', 'font-size: 24px; font-weight: bold; color: #38bdf8;');
console.log('%cLooking at the code? I like your style!', 'font-size: 14px; color: #94a3b8;');
console.log('%cFeel free to reach out: atabikwifaqul89@email.com', 'font-size: 12px; color: #64748b;');

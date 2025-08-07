// Mobile navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (toggleButton && navMenu) {
        toggleButton.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            // Toggle ARIA state for accessibility
            this.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');
            
            // Animate hamburger lines
            const lines = this.querySelectorAll('.hamburger-line');
            lines.forEach((line, index) => {
                if (navMenu.classList.contains('active')) {
                    if (index === 0) line.style.transform = 'rotate(45deg) translate(5px, 5px)';
                    if (index === 1) line.style.opacity = '0';
                    if (index === 2) line.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    line.style.transform = '';
                    line.style.opacity = '';
                }
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!toggleButton.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                toggleButton.setAttribute('aria-expanded', 'false');
                
                // Reset hamburger lines
                const lines = toggleButton.querySelectorAll('.hamburger-line');
                lines.forEach(line => {
                    line.style.transform = '';
                    line.style.opacity = '';
                });
            }
        });
    }
});

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Performance optimization: Intersection Observer for animations
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered animation delays
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                    
                    // Add specific animations based on element type
                    if (entry.target.classList.contains('service-card')) {
                        entry.target.classList.add('bounce-in');
                    } else if (entry.target.classList.contains('stat')) {
                        entry.target.classList.add('slide-in-left');
                        animateNumber(entry.target);
                    } else if (entry.target.classList.contains('testimonial')) {
                        entry.target.classList.add('slide-in-right');
                    } else if (entry.target.classList.contains('hero-card')) {
                        entry.target.classList.add('float');
                    }
                }, index * 150);
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate in
    const animatedElements = document.querySelectorAll('.service-card, .hero-card, .testimonial, .stat, .section-header');
    animatedElements.forEach(el => observer.observe(el));
    
    // Add parallax effect to hero background
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
});

// Animate numbers when they come into view
function animateNumber(element) {
    const numberElement = element.querySelector('.stat-number');
    if (!numberElement) return;
    
    const finalNumber = numberElement.textContent;
    const numericValue = parseInt(finalNumber.replace(/[^\d]/g, ''));
    const suffix = finalNumber.replace(/[\d]/g, '');
    
    let currentNumber = 0;
    const increment = numericValue / 50;
    
    const timer = setInterval(() => {
        currentNumber += increment;
        if (currentNumber >= numericValue) {
            currentNumber = numericValue;
            clearInterval(timer);
        }
        numberElement.textContent = Math.floor(currentNumber) + suffix;
    }, 40);
}

// Form validation helpers (for future contact forms)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\+]?[1-9][\d]{0,15}$/;
    return re.test(phone.replace(/[\s\-\(\)]/g, ''));
}

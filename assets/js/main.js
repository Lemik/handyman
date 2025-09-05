// Main JavaScript for Nanaimo Handyman Services Website

// Language detection and switching
function detectBrowserLanguage() {
    const browserLang = navigator.language || navigator.userLanguage;
    const supportedLangs = ['en', 'fr', 'uk', 'ru'];
    
    // Extract primary language code
    const primaryLang = browserLang.split('-')[0];
    
    // Check if browser language is supported
    if (supportedLangs.includes(primaryLang)) {
        // Check if we're not already on the correct language
        const currentLang = document.documentElement.lang || 'en';
        if (currentLang !== primaryLang) {
            // Redirect to the appropriate language version
            const currentPath = window.location.pathname;
            const newPath = primaryLang === 'en' ? 
                currentPath.replace(/^\/(fr|uk|ru)\//, '/') : 
                currentPath.replace(/^\/(fr|uk|ru)\//, `/${primaryLang}/`);
            
            if (newPath !== currentPath) {
                window.location.href = newPath;
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initSmoothScrolling();
    initFormHandling();
    initAnimations();
    initTestimonialSlider();
    initMobileMenu();
    updateCurrentLanguage();
    
    // Only detect language on first visit (no redirect if user manually changed language)
    if (!localStorage.getItem('languageSelected')) {
        detectBrowserLanguage();
    }
});

// Track language selection
document.addEventListener('click', function(e) {
    if (e.target.closest('.language-switcher a') || e.target.closest('#languageDropdown a')) {
        localStorage.setItem('languageSelected', 'true');
    }
});

// Update current language indicator
function updateCurrentLanguage() {
    const currentLang = document.getElementById('current-lang');
    if (currentLang) {
        const path = window.location.pathname;
        if (path.startsWith('/fr/')) {
            currentLang.textContent = 'FR';
        } else if (path.startsWith('/uk/')) {
            currentLang.textContent = 'UK';
        } else if (path.startsWith('/ru/')) {
            currentLang.textContent = 'RU';
        } else {
            currentLang.textContent = 'EN';
        }
    }
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    const scrollToForm = () => {
        const form = document.getElementById('estimate-form');
        if (form) {
            form.scrollIntoView({ 
                behavior: 'smooth',
                block: 'center'
            });
        }
    };

    // Make scrollToForm globally available
    window.scrollToForm = scrollToForm;

    // Handle only internal page anchor links with smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        // Skip if it's a navigation link to another page
        if (anchor.getAttribute('href') === '#services' || 
            anchor.getAttribute('href') === '#estimate-form' ||
            anchor.getAttribute('href') === '#roofing-estimate' ||
            anchor.getAttribute('href') === '#gutter-estimate' ||
            anchor.getAttribute('href') === '#fence-estimate' ||
            anchor.getAttribute('href') === '#interior-estimate') {
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
        }
    });
}

// Form handling for estimate requests
function initFormHandling() {
    const form = document.getElementById('estimate-form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.innerHTML = 'Sending...';
        submitBtn.disabled = true;

        // Simulate form submission (replace with actual form handling)
        setTimeout(() => {
            // Show success message
            showNotification('Thank you! We\'ll contact you shortly.', 'success');
            
            // Reset form
            form.reset();
            
            // Reset button
            submitBtn.classList.remove('loading');
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Show notification messages
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification alert alert-${type === 'success' ? 'success' : 'info'} alert-dismissible fade show position-fixed`;
    notification.style.cssText = `
        top: 100px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
    `;
    
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;

    // Add to page
    document.body.appendChild(notification);

    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Initialize animations
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all elements with fade-in class
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// Testimonial slider functionality
function initTestimonialSlider() {
    const testimonials = document.querySelectorAll('.testimonial-card');
    if (testimonials.length === 0) return;

    let currentIndex = 0;
    const interval = 5000; // 5 seconds

    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.style.display = i === index ? 'block' : 'none';
        });
    }

    function nextTestimonial() {
        currentIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(currentIndex);
    }

    // Auto-rotate testimonials
    if (testimonials.length > 1) {
        setInterval(nextTestimonial, interval);
    }

    // Show first testimonial initially
    showTestimonial(0);
}

// Mobile menu enhancements
function initMobileMenu() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    if (!navbarToggler || !navbarCollapse) return;

    // Close mobile menu when clicking on a link
    const navLinks = navbarCollapse.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 992) { // Bootstrap lg breakpoint
                const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                    hide: true
                });
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navbarToggler.contains(e.target) && !navbarCollapse.contains(e.target)) {
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                    hide: true
                });
            }
        }
    });
}

// Utility function to validate phone numbers
function validatePhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}

// Utility function to validate email
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Form validation
function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
        const value = field.value.trim();
        
        if (!value) {
            showFieldError(field, 'This field is required');
            isValid = false;
        } else if (field.type === 'email' && !validateEmail(value)) {
            showFieldError(field, 'Please enter a valid email address');
            isValid = false;
        } else if (field.name === 'phone' && !validatePhone(value)) {
            showFieldError(field, 'Please enter a valid phone number');
            isValid = false;
        } else {
            clearFieldError(field);
        }
    });

    return isValid;
}

// Show field error
function showFieldError(field, message) {
    clearFieldError(field);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'invalid-feedback d-block';
    errorDiv.textContent = message;
    
    field.classList.add('is-invalid');
    field.parentNode.appendChild(errorDiv);
}

// Clear field error
function clearFieldError(field) {
    field.classList.remove('is-invalid');
    const errorDiv = field.parentNode.querySelector('.invalid-feedback');
    if (errorDiv) {
        errorDiv.remove();
    }
}

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading if images exist
if (document.querySelectorAll('img[data-src]').length > 0) {
    initLazyLoading();
}

// Add fade-in class to elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const elementsToAnimate = document.querySelectorAll('.service-card, .testimonial-card, .gallery-item');
    elementsToAnimate.forEach(el => {
        el.classList.add('fade-in');
    });
});

// Handle window resize events
window.addEventListener('resize', function() {
    // Reinitialize components if needed on resize
    if (window.innerWidth >= 992) {
        // Desktop view - ensure mobile menu is closed
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
            const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                hide: true
            });
        }
    }
});

// Export functions for global use
window.handymanUtils = {
    scrollToForm,
    showNotification,
    validateForm,
    validatePhone,
    validateEmail
};

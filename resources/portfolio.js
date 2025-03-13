/**
 * Tonci Zizic Portfolio - Enhanced JavaScript Functionality
 * This file contains client-side JavaScript enhancements for the portfolio
 * Compatible with GitHub Pages (static site hosting)
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initSmoothScrolling();
    initSkillBarAnimations();
    initScrollReveal();
    initTypingEffect();
    initFormValidation();
    initThemeToggle();
    initProjectFilters();
    initGlassmorphicEffects();
    addThicknessShadows();
});

/**
 * Smooth scrolling for navigation links
 */
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only apply to same-page links
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100, // Offset for fixed header
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

/**
 * Animate skill bars when they come into view
 */
function initSkillBarAnimations() {
    const progressBars = document.querySelectorAll('.progress');
    
    if (progressBars.length === 0) return;
    
    const animateProgressBars = () => {
        progressBars.forEach(bar => {
            const rect = bar.getBoundingClientRect();
            const isInView = rect.top <= window.innerHeight && rect.bottom >= 0;
            
            if (isInView) {
                const width = bar.getAttribute('data-width') || bar.style.width;
                bar.style.width = '0';
                
                setTimeout(() => {
                    bar.style.transition = 'width 1s ease-in-out';
                    bar.style.width = width;
                }, 100);
            }
        });
    };
    
    // Initial check
    animateProgressBars();
    
    // Check on scroll
    window.addEventListener('scroll', animateProgressBars);
}

/**
 * Reveal elements with animation as they scroll into view
 */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.expertise-card, .skill-item, .timeline-content, .case-study');
    
    if (revealElements.length === 0) return;
    
    const revealOnScroll = () => {
        revealElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const isInView = rect.top <= window.innerHeight - 100;
            
            if (isInView) {
                element.classList.add('revealed');
            }
        });
    };
    
    // Add CSS class for non-revealed elements
    revealElements.forEach(element => {
        element.classList.add('reveal-element');
    });
    
    // Initial check
    revealOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', revealOnScroll);
}

/**
 * Typing effect for header subtitle
 */
function initTypingEffect() {
    const headerSubtitle = document.querySelector('header h2');
    
    if (!headerSubtitle) return;
    
    const originalText = headerSubtitle.textContent;
    headerSubtitle.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < originalText.length) {
            headerSubtitle.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    // Start typing effect
    setTimeout(typeWriter, 1000);
}

/**
 * Client-side form validation
 */
function initFormValidation() {
    const contactForm = document.getElementById('contact-form');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        let isValid = true;
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        
        // Clear previous error messages
        document.querySelectorAll('.error-message').forEach(el => el.remove());
        
        // Validate name
        if (!nameInput.value.trim()) {
            displayError(nameInput, 'Please enter your name');
            isValid = false;
        }
        
        // Validate email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailInput.value)) {
            displayError(emailInput, 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate message
        if (!messageInput.value.trim()) {
            displayError(messageInput, 'Please enter your message');
            isValid = false;
        }
        
        if (!isValid) {
            e.preventDefault();
        }
    });
    
    function displayError(inputElement, message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.color = 'var(--accent-color)';
        errorDiv.style.fontSize = 'var(--font-size-sm)';
        errorDiv.style.marginTop = '5px';
        
        inputElement.parentNode.appendChild(errorDiv);
        inputElement.style.borderColor = 'var(--accent-color)';
    }
}

/**
 * Project filtering functionality
 */
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterButtons.length === 0 || projectCards.length === 0) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            // Filter projects
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.classList.remove('hidden');
                    // Add animation
                    card.style.animation = 'fadeIn 0.5s ease forwards';
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}

/**
 * Dark/Light theme toggle
 */
function initThemeToggle() {
    // Create theme toggle button
    const themeToggle = document.createElement('button');
    themeToggle.id = 'theme-toggle';
    themeToggle.innerHTML = '☀️';
    themeToggle.setAttribute('aria-label', 'Toggle dark/light mode');
    themeToggle.classList.add('theme-toggle');
    
    // Style the button
    themeToggle.style.position = 'fixed';
    themeToggle.style.bottom = '20px';
    themeToggle.style.right = '20px';
    themeToggle.style.zIndex = '1000';
    themeToggle.style.width = '50px';
    themeToggle.style.height = '50px';
    themeToggle.style.borderRadius = '50%';
    themeToggle.style.backgroundColor = 'var(--glass-bg-darker)';
    themeToggle.style.color = 'var(--text-color)';
    themeToggle.style.border = '2px solid var(--glass-border)';
    themeToggle.style.fontSize = '1.5rem';
    themeToggle.style.cursor = 'pointer';
    themeToggle.style.boxShadow = 'var(--shadow)';
    themeToggle.style.transition = 'all 0.3s ease';
    
    // Add hover effect
    themeToggle.addEventListener('mouseover', () => {
        themeToggle.style.transform = 'translateY(-5px)';
        themeToggle.style.boxShadow = 'var(--hover-shadow)';
    });
    
    themeToggle.addEventListener('mouseout', () => {
        themeToggle.style.transform = 'translateY(0)';
        themeToggle.style.boxShadow = 'var(--shadow)';
    });
    
    // Add to body
    document.body.appendChild(themeToggle);
    
    // Check for saved theme preference
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'light') {
        document.body.classList.add('light-theme');
        themeToggle.innerHTML = '🌙';
        themeToggle.style.backgroundColor = 'rgba(0, 0, 0, 0.8)'; // Darker background for light theme
    }
    
    // Toggle theme on click
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        
        if (document.body.classList.contains('light-theme')) {
            localStorage.setItem('theme', 'light');
            themeToggle.innerHTML = '🌙';
            themeToggle.style.backgroundColor = 'rgba(0, 0, 0, 0.8)'; // Darker background for light theme
        } else {
            localStorage.setItem('theme', 'dark');
            themeToggle.innerHTML = '☀️';
            themeToggle.style.backgroundColor = 'var(--glass-bg-darker)'; // Reset to default for dark theme
        }
    });
}

/**
 * Enhanced glassmorphic effects with 3D movement
 */
function initGlassmorphicEffects() {
    // Elements that will have 3D movement effect
    const glassElements = document.querySelectorAll('.expertise-card, .skill-item, .project-card, .tool-item, .case-study');
    
    glassElements.forEach(element => {
        // Add 3D movement on mouse move
        element.addEventListener('mousemove', e => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element
            const y = e.clientY - rect.top; // y position within the element
            
            // Calculate rotation based on mouse position
            // The closer to the edge, the more it rotates
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Calculate rotation (max 5 degrees)
            const rotateY = ((x - centerX) / centerX) * 5;
            const rotateX = ((centerY - y) / centerY) * 5;
            
            // Apply transform
            element.style.transform = `translateY(-10px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            
            // Add highlight effect based on mouse position
            const shine = element.querySelector('.glass-shine') || document.createElement('div');
            if (!shine.classList.contains('glass-shine')) {
                shine.classList.add('glass-shine');
                element.appendChild(shine);
            }
            
            // Position the shine effect
            shine.style.opacity = '0.15';
            shine.style.transform = `translate(${x}px, ${y}px)`;
        });
        
        // Reset on mouse leave
        element.addEventListener('mouseleave', () => {
            element.style.transform = '';
            const shine = element.querySelector('.glass-shine');
            if (shine) {
                shine.style.opacity = '0';
            }
        });
    });
    
    // Add CSS for the glass shine effect
    const style = document.createElement('style');
    style.textContent = `
        .glass-shine {
            position: absolute;
            top: -50px;
            left: -50px;
            width: 100px;
            height: 100px;
            background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%);
            border-radius: 50%;
            pointer-events: none;
            transition: opacity 0.3s ease;
            z-index: 10;
            opacity: 0;
        }
    `;
    document.head.appendChild(style);
    
    // Add subtle floating animation to theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('mousemove', e => {
            const rect = themeToggle.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateY = ((x - centerX) / centerX) * 15;
            const rotateX = ((centerY - y) / centerY) * 15;
            
            themeToggle.style.transform = `translateY(-8px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        themeToggle.addEventListener('mouseleave', () => {
            themeToggle.style.transform = '';
        });
    }
}

/**
 * Add thickness shadow elements to create 3D glass effect
 */
function addThicknessShadows() {
    const glassElements = document.querySelectorAll('.expertise-card, .skill-item, .project-card, .tool-item, .case-study');
    
    glassElements.forEach(element => {
        // Create thickness shadow element
        const thicknessShadow = document.createElement('div');
        thicknessShadow.classList.add('thickness-shadow');
        element.appendChild(thicknessShadow);
    });
} 
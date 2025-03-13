document.addEventListener('DOMContentLoaded', function() {
    // Responsive navigation implementation
    // Note: Hamburger menu implementation removed as we're using
    // a simpler responsive approach with CSS only
    
    const nav = document.querySelector('nav');
    
    // Keep reference to nav links for potential future enhancements
    const navLinks = document.querySelectorAll('nav a');
    
    // Add touch support for 3D effects on mobile
    enableTouchEffects();
});

/**
 * Enables 3D touch effects for mobile devices
 * This adds touch event listeners to all interactive elements
 * to simulate hover effects on touch devices
 */
function enableTouchEffects() {
    // Elements that should have 3D effects on touch
    const interactiveElements = document.querySelectorAll(`
        .expertise-card, .skill-item, .timeline-content, 
        .case-study, .project-card, .tool-item, 
        .contact-info, .contact-form, .btn, .filter-btn, nav a
    `);
    
    // Touch start - add active class
    interactiveElements.forEach(element => {
        element.addEventListener('touchstart', function(e) {
            // Remove active class from all elements first
            interactiveElements.forEach(el => {
                el.classList.remove('touch-active');
                el.classList.remove('touch-pulse');
            });
            
            // Add active class to current element
            this.classList.add('touch-active');
            this.classList.add('touch-pulse');
            
            // Don't prevent default to allow links to work
            // but stop propagation to parent elements
            e.stopPropagation();
        });
        
        // Touch end - keep active class for a moment then remove
        element.addEventListener('touchend', function() {
            const el = this;
            // Keep effect for a short time after touch ends
            setTimeout(() => {
                el.classList.remove('touch-pulse');
                // Keep the touch-active class for links until navigation
                if (el.tagName !== 'A') {
                    setTimeout(() => {
                        el.classList.remove('touch-active');
                    }, 500);
                }
            }, 300);
        });
    });
    
    // Remove active class when touching elsewhere
    document.addEventListener('touchstart', function(e) {
        if (!e.target.closest('.expertise-card, .skill-item, .timeline-content, .case-study, .project-card, .tool-item, .contact-info, .contact-form, .btn, .filter-btn, nav a')) {
            document.querySelectorAll('.touch-active').forEach(el => {
                el.classList.remove('touch-active');
                el.classList.remove('touch-pulse');
            });
        }
    });
    
    // Add a class to the body to indicate touch device
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        document.body.classList.add('touch-device');
    }
}


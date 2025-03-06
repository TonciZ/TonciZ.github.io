document.addEventListener('DOMContentLoaded', function() {
    // Add hamburger menu to the navigation
    const nav = document.querySelector('nav');
    const hamburger = document.createElement('div');
    hamburger.className = 'hamburger';
    hamburger.innerHTML = '<span></span><span></span><span></span>';
    nav.prepend(hamburger);
    
    // Toggle nav menu on hamburger click
    hamburger.addEventListener('click', function() {
        nav.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 770) {
                nav.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = nav.contains(event.target);
        if (!isClickInsideNav && nav.classList.contains('active') && window.innerWidth <= 770) {
            nav.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
    
    // Close mobile menu when window is resized above mobile breakpoint
    window.addEventListener('resize', function() {
        if (window.innerWidth > 770 && nav.classList.contains('active')) {
            nav.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});


document.addEventListener("DOMContentLoaded", function() {
    // Select all necessary elements
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector("nav");
    const overlay = document.querySelector(".nav-overlay");
    const navLinks = document.querySelectorAll("nav a");
    
    // Function to toggle the menu
    function toggleMenu() {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
        document.body.classList.toggle("menu-active");
    }
    
    // Initialize the menu
    function initMobileMenu() {
        // Only setup if hamburger menu exists
        if (!hamburger) return;
        
        // Remove any existing event listeners first
        hamburger.removeEventListener("click", toggleMenu);
        
        // Add hamburger menu click event
        hamburger.addEventListener("click", toggleMenu);
        
        // Add overlay click event if it exists
        if (overlay) {
            overlay.removeEventListener("click", toggleMenu);
            overlay.addEventListener("click", toggleMenu);
        }
        
        // Add click events to all navigation links
        navLinks.forEach(link => {
            link.removeEventListener("click", handleLinkClick);
            link.addEventListener("click", handleLinkClick);
        });
    }
    
    // Handle navigation link clicks
    function handleLinkClick(e) {
        if (window.innerWidth <= 600 && navMenu.classList.contains("active")) {
            // Small delay to ensure the click completes navigation
            setTimeout(() => {
                toggleMenu();
            }, 100);
        }
    }
    
    // Setup on page load
    initMobileMenu();
    
    // Setup on window resize
    window.addEventListener("resize", function() {
        if (window.innerWidth > 600) {
            // Remove mobile menu active state on larger screens
            if (navMenu.classList.contains("active")) {
                navMenu.classList.remove("active");
                hamburger.classList.remove("active");
                document.body.classList.remove("menu-active");
            }
        }
    });
});

document.addEventListener("DOMContentLoaded", function() {
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
    
    // Check if hamburger button exists
    if (hamburger) {
        // Event listener for hamburger button
        hamburger.addEventListener("click", toggleMenu);
        
        // Event listener for overlay if it exists
        if (overlay) {
            overlay.addEventListener("click", toggleMenu);
        }
        
        // Event listeners for navigation links
        navLinks.forEach(link => {
            link.addEventListener("click", function(e) {
                if (navMenu.classList.contains("active")) {
                    // Small delay to ensure the click event completes
                    setTimeout(() => {
                        toggleMenu();
                    }, 100);
                }
            });
        });
    }
});

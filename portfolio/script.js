document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle (Hamburger Menu) for sidebar
    const burger = document.getElementById('burger');
    const navLinksSidebar = document.getElementById('navLinks'); // Renamed from navLinks to navLinksSidebar in HTML
    
    // Correctly target the sidebar navigation links element
    // Assuming the ul element for sidebar links has an ID of 'navLinksSidebar' from HTML above
    const navLinksList = document.querySelector('.nav-links-sidebar'); 

    if (burger && navLinksList) {
        burger.addEventListener('click', () => {
            navLinksList.classList.toggle('active'); // Use 'active' class for mobile nav visibility
            burger.classList.toggle('toggle');
        });
    }

    // Smooth Scrolling for Navigation (adjusted for sidebar)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Calculate scroll position, accounting for potential fixed header/sidebar on different screen sizes
                let offset = 0;
                if (window.innerWidth <= 768) { // If on mobile, likely a top header
                    offset = document.querySelector('.sidebar-nav')?.offsetHeight || 0;
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - offset,
                    behavior: 'smooth'
                });

                // Close mobile nav if open
                if (window.innerWidth <= 768 && navLinksList.classList.contains('active')) {
                    navLinksList.classList.remove('active');
                    burger.classList.remove('toggle');
                }
            }
        });
    });

    // Set current year in footer
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Optional: Simple Form Submission (no backend for static site)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission

            // Basic validation
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (name === '' || email === '' || message === '') {
                alert('Please fill in all fields.');
                return;
            }

            if (!/\S+@\S+\.\S+/.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset(); // Clear the form
        });
    }
});
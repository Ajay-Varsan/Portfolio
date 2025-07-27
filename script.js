document.addEventListener('DOMContentLoaded', () => {
    // 1. Dynamic Year for Footer
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // 2. Scroll to Top Button Functionality
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    
    // Show/hide the button based on scroll position
    window.addEventListener('scroll', () => {
        if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
            scrollToTopBtn.style.display = "block";
        } else {
            scrollToTopBtn.style.display = "none";
        }
    });

    // When the user clicks on the button, scroll to the top of the document
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth' // Smooth scroll animation
            });
        });
    }

    // 3. Smooth Scroll for Navigation Links
    document.querySelectorAll('a.nav-link').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent default anchor click behavior

            const targetId = this.getAttribute('href'); // Get the href attribute (e.g., "#summary")
            const targetElement = document.querySelector(targetId); // Find the corresponding section

            if (targetElement) {
                const navbarHeight = document.getElementById('navbar').offsetHeight; // Get dynamic navbar height
                const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20; // Calculate scroll position, adjust by 20px for padding

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. Sticky Navbar on Scroll
    const navbar = document.getElementById('navbar');
    const heroSectionHeight = document.querySelector('.hero-section').offsetHeight;

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > heroSectionHeight - navbar.offsetHeight) {
            navbar.classList.add('sticky');
        } else {
            navbar.classList.remove('sticky');
        }
    });

    // 5. Active Navigation Link Highlighting on Scroll
    const sections = document.querySelectorAll('section[id]'); // Get all sections with an ID
    const navLinks = document.querySelectorAll('.nav-link');

    const observerOptions = {
        root: null, // relative to the viewport
        rootMargin: '-50% 0px -49% 0px', // When the middle of the section is in view
        threshold: 0 // IntersectionObserver fires as soon as 0% of target is visible
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove 'active' class from all links
                navLinks.forEach(link => link.classList.remove('active'));
                // Add 'active' class to the corresponding nav link
                const activeLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // 6. Section Card Fade-in on Scroll
    const sectionCards = document.querySelectorAll('.section-card');
    const cardObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // When 10% of the card is visible
    };

    const cardObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible'); // Add 'visible' class
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    }, cardObserverOptions);

    sectionCards.forEach(card => {
        cardObserver.observe(card);
    });
});
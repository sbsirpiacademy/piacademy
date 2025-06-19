document.addEventListener('DOMContentLoaded', () => {
    // Hide the loading overlay
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) {
        loadingOverlay.style.opacity = '0';
        loadingOverlay.addEventListener('transitionend', () => {
            loadingOverlay.style.display = 'none';
        }, { once: true }); // Ensure this runs only once
    }

    // --- Dark/Light Mode Toggle ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;
    const themeIcon = themeToggleBtn.querySelector('i'); // Get the icon element

    // Check for saved theme preference in localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.remove('light-mode', 'dark-mode'); // Remove default class
        body.classList.add(savedTheme);
        updateThemeIcon(savedTheme);
    } else {
        // Default to light mode if no preference is saved
        body.classList.add('light-mode');
        updateThemeIcon('light-mode');
    }

    function updateThemeIcon(currentTheme) {
        if (currentTheme === 'dark-mode') {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    }

    themeToggleBtn.addEventListener('click', () => {
        if (body.classList.contains('light-mode')) {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark-mode');
            updateThemeIcon('dark-mode');
        } else {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            localStorage.setItem('theme', 'light-mode');
            updateThemeIcon('light-mode');
        }
    });

    // --- Smooth Scrolling for Navigation ---
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                // Get header height dynamically for accurate scroll
                const headerHeight = document.querySelector('header').offsetHeight;
                window.scrollTo({
                    top: targetSection.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
                // Close mobile nav if open
                if (document.querySelector('.nav-links').classList.contains('nav-active')) {
                    toggleNav();
                }
            }
        });
    });

    // --- Mobile Navigation Toggle ---
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    const toggleNav = () => {
        nav.classList.toggle('nav-active');
        burger.classList.toggle('toggle'); // Burger animation

        // Animate links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
    };

    burger.addEventListener('click', toggleNav);

    // --- "Read More" functionality for About Section ---
    const readMoreBtn = document.querySelector('.read-more-btn');
    const teacherDetailsP = document.querySelector('.teacher-details p:nth-of-type(4)'); // Selects the paragraph with the main description
    let fullText = '';
    let shortText = '';

    if (readMoreBtn && teacherDetailsP) {
        fullText = teacherDetailsP.innerHTML;
        const maxLength = 250; // You can adjust this
        if (fullText.length > maxLength) {
            shortText = fullText.substring(0, maxLength) + '...';
            teacherDetailsP.innerHTML = shortText; // Initialize with short text
            readMoreBtn.style.display = 'inline-block'; // Show button if text is long
        } else {
            readMoreBtn.style.display = 'none'; // Hide button if text is short
        }


        readMoreBtn.addEventListener('click', () => {
            if (teacherDetailsP.innerHTML === shortText) {
                teacherDetailsP.innerHTML = fullText;
                readMoreBtn.textContent = 'Read Less';
            } else {
                teacherDetailsP.innerHTML = shortText;
                readMoreBtn.textContent = 'Read More';
            }
        });
    }


    // --- PYQ Filtering Logic ---
    const boardSelect = document.getElementById('board-select');
    const classSelect = document.getElementById('class-select');
    const filterPyqBtn = document.getElementById('filter-pyq-btn');
    const pyqResults = document.querySelector('.pyq-results');

    // Dummy PYQ Data (Replace with real data structure and actual PDF links)
    const pyqData = {
        'wbbse': {
            '8': [
                { year: 2023, link: 'pyqs/wbbse_class8_2023.pdf' },
                { year: 2022, link: 'pyqs/wbbse_class8_2022.pdf' },
                { year: 2021, link: 'pyqs/wbbse_class8_2021.pdf' }
            ],
            '9': [
                { year: 2023, link: 'pyqs/wbbse_class9_2023.pdf' },
                { year: 2022, link: 'pyqs/wbbse_class9_2022.pdf' }
            ],
            '10': [
                { year: 2025, link: 'wb-board-class-10-mathematics-2025.pdf' },
                { year: 2024, link: 'wb-board-class-10-mathematics-2024.pdf' },
                { year: 2023, link: 'wb-board-class-10-mathematics-2023.pdf' },
                { year: 2022, link: 'wb-board-class-10-mathematics-2022.pdf' },
                { year: 2021, link: 'wb-board-class-10-mathematics-2021.pdf' },
                { year: 2020, link: 'wb-board-class-10-mathematics-2020.pdf' }
            ],
            '11': [
                { year: 2023, link: 'pyqs/wbbse_class11_2023.pdf' },
                { year: 2022, link: 'pyqs/wbbse_class11_2022.pdf' },
                { year: 2021, link: 'pyqs/wbbse_class11_2021.pdf' }
            ],
            '12': [
                { year: 2025, link: 'wb-board-class-12-mathematics-2025.pdf' },
                { year: 2024, link: 'wb-board-class-12-mathematics-2024.pdf' },
                { year: 2023, link: 'wb-board-class-12-mathematics-2023.pdf' },
                { year: 2022, link: 'wb-board-class-12-mathematics-2022.pdf' },
                { year: 2021, link: 'wb-board-class-12-mathematics-2021.pdf' },
                { year: 2020, link: 'wb-board-class-12-mathematics-2020.pdf' },
                { year: 2019, link: 'wb-board-class-12-mathematics-2019.pdf' },
                { year: 2018, link: 'wb-board-class-12-mathematics-2018.pdf' },
            ]
        },
        'cbse': {
            '8': [
                { year: 2023, link: 'pyqs/cbse_class8_2023.pdf' },
                { year: 2022, link: 'pyqs/cbse_class8_2022.pdf' }
            ],
            '9': [
                { year: 2023, link: 'pyqs/cbse_class9_2023.pdf' },
                { year: 2022, link: 'pyqs/cbse_class9_2022.pdf' }
            ],
            '10': [
                { year: 2023, link: 'pyqs/cbse_class10_2023.pdf' },
                { year: 2022, link: 'pyqs/cbse_class10_2022.pdf' },
                { year: 2021, link: 'pyqs/cbse_class10_2021.pdf' }
            ],
            '11': [
                { year: 2023, link: 'pyqs/cbse_class11_2023.pdf' },
                { year: 2022, link: 'pyqs/cbse_class11_2022.pdf' },
                { year: 2021, link: 'pyqs/cbse_class11_2021.pdf' }
            ],
            '12': [
                { year: 2023, link: 'pyqs/cbse_class12_2023.pdf' },
                { year: 2022, link: 'pyqs/cbse_class12_2022.pdf' },
                { year: 2021, link: 'pyqs/cbse_class12_2021.pdf' }
            ]
        }
    };

    filterPyqBtn.addEventListener('click', () => {
        const selectedBoard = boardSelect.value;
        const selectedClass = classSelect.value;
        pyqResults.innerHTML = ''; // Clear previous results

        if (selectedBoard && selectedClass) {
            const pyqs = pyqData[selectedBoard]?.[selectedClass];
            if (pyqs && pyqs.length > 0) {
                const ul = document.createElement('ul');
                pyqs.forEach(pyq => {
                    const li = document.createElement('li');
                    li.innerHTML = `<span>${selectedBoard.toUpperCase()} Class ${selectedClass} - ${pyq.year}</span> <a href="${pyq.link}" target="_blank" download>Download PDF <i class="fas fa-download"></i></a>`;
                    ul.appendChild(li);
                });
                pyqResults.appendChild(ul);
            } else {
                pyqResults.innerHTML = '<p class="no-pyq-message">No PYQs found for the selected criteria.</p>';
            }
        } else {
            pyqResults.innerHTML = '<p class="no-pyq-message">Please select both a board and a class.</p>';
        }
    });



    // --- Testimonial Carousel ---
    const testimonialCarousel = document.querySelector('.testimonial-carousel');
    const prevButton = document.querySelector('.carousel-prev');
    const nextButton = document.querySelector('.carousel-next');

    if (testimonialCarousel) {
        let scrollAmount = 0;
        let cardWidth = 0;

        // Function to update cardWidth (useful if screen size changes)
        const updateCardWidth = () => {
            const firstCard = document.querySelector('.testimonial-card');
            if (firstCard) {
                // Adjust this calculation if you change gap or card sizing
                cardWidth = firstCard.offsetWidth + 20; // Card width + gap
            }
        };

        updateCardWidth(); // Set initial card width

        nextButton.addEventListener('click', () => {
            if (cardWidth === 0) updateCardWidth(); // Recalculate if not set
            scrollAmount += cardWidth;
            // Loop back to start if at end
            if (scrollAmount >= testimonialCarousel.scrollWidth - testimonialCarousel.clientWidth + 10) { // Add a small buffer
                scrollAmount = 0;
            }
            testimonialCarousel.scrollTo({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });

        prevButton.addEventListener('click', () => {
            if (cardWidth === 0) updateCardWidth(); // Recalculate if not set
            scrollAmount -= cardWidth;
            // Loop to end if at start
            if (scrollAmount < 0) {
                scrollAmount = testimonialCarousel.scrollWidth - testimonialCarousel.clientWidth;
            }
            testimonialCarousel.scrollTo({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });

        // Optional: Auto-play carousel
        let autoScrollInterval;
        const startAutoScroll = () => {
            autoScrollInterval = setInterval(() => {
                nextButton.click(); // Programmatically click the next button
            }, 5000); // Change slide every 5 seconds
        };

        const stopAutoScroll = () => {
            clearInterval(autoScrollInterval);
        };

        // Pause on hover
        testimonialCarousel.addEventListener('mouseenter', stopAutoScroll);
        testimonialCarousel.addEventListener('mouseleave', startAutoScroll);

        startAutoScroll(); // Start auto-scrolling on load
    }


    // --- Intersection Observer for animations on scroll ---
    const sections = document.querySelectorAll('section:not(#hero)'); // Exclude hero as it has initial animations
    const observerOptions = {
        root: null, // viewport
        threshold: 0.1 // When 10% of the section is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.classList.add('hidden'); // Add a hidden class initially in CSS
        observer.observe(section);
    });

    // Optional: Add pulse animation to CTA button on hero
    const heroCtaButton = document.querySelector('.hero-section .cta-button');
    if (heroCtaButton) {
        heroCtaButton.classList.add('pulse');
    }
});

// To ensure the loading overlay is visible immediately before DOMContentLoaded fires,
// add a class to the body on load and remove it when the DOM is ready.
// This small script needs to be placed at the very top of your <head> or before </body>
// to ensure it runs as early as possible.
document.documentElement.classList.add('loading'); // Add to html to prevent FOUC for body styles
window.addEventListener('load', () => {
    document.documentElement.classList.remove('loading');
});
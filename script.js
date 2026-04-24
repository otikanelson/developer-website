// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeAnimations();
    setupScrollAnimations();
    setupInteractiveElements();
    setupProjectBackgrounds();
});

// Setup project card background images
function setupProjectBackgrounds() {
    const projectCards = document.querySelectorAll('.project-card[data-bg]');
    projectCards.forEach(card => {
        const bgImage = card.getAttribute('data-bg');
        if (bgImage) {
            card.style.backgroundImage = `url('${bgImage}')`;
        }
    });
}

// Initialize entrance animations
function initializeAnimations() {
    // Animate section titles
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach((title, index) => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 30,
            duration: 0.8,
            delay: 0.1
        });
    });

    // Animate project cards with stagger (updated selector)
    const projectCards = document.querySelectorAll('.project-card');
    
    // Ensure cards are visible first
    gsap.set(projectCards, { opacity: 1 });
    
    gsap.from(projectCards, {
        scrollTrigger: {
            trigger: '.masonry-grid',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        y: 40,
        duration: 0.6,
        stagger: 0.1
    });

    // Animate skill categories
    const skillCategories = document.querySelectorAll('.skill-category');
    gsap.from(skillCategories, {
        scrollTrigger: {
            trigger: '.skills-grid',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 40,
        duration: 0.6,
        stagger: 0.1
    });

    // Animate timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            x: index % 2 === 0 ? -40 : 40,
            duration: 0.8,
            delay: index * 0.1
        });
    });

    // Animate highlights
    const highlights = document.querySelectorAll('.highlight');
    // Ensure highlights are visible initially
    gsap.set(highlights, { opacity: 1 });
    gsap.from(highlights, {
        scrollTrigger: {
            trigger: '.about-highlights',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.1
    });
}

// Setup scroll-triggered animations
function setupScrollAnimations() {
    // Parallax effect on hero background
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        gsap.to(heroBackground, {
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: 1,
                markers: false
            },
            backgroundPosition: '50% 100%',
            ease: 'none'
        });
    }

    // Fade out hero content on scroll
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        gsap.to(heroContent, {
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: 1
            },
            opacity: 0.3,
            y: 100,
            ease: 'none'
        });
    }

    // Animate stat items on scroll
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach((item, index) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            scale: 0.8,
            duration: 0.6,
            delay: index * 0.1
        });

        // Counter animation for stat numbers
        const statNumber = item.querySelector('.stat-number');
        if (statNumber) {
            const text = statNumber.textContent;
            const isPercentage = text.includes('%');
            const isDecimal = text.includes('.');
            
            let endValue = parseFloat(text);
            if (isPercentage) endValue = 100;
            if (isDecimal) endValue = 10;

            gsap.from({ value: 0 }, {
                scrollTrigger: {
                    trigger: item,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                value: endValue,
                duration: 2,
                onUpdate: function() {
                    if (isPercentage) {
                        statNumber.textContent = Math.round(this.targets()[0].value) + '%';
                    } else if (isDecimal) {
                        statNumber.textContent = this.targets()[0].value.toFixed(1);
                    } else {
                        statNumber.textContent = Math.round(this.targets()[0].value) + '+';
                    }
                }
            });
        }
    });
}

// Setup interactive elements
function setupInteractiveElements() {
    // Hover animations for project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                duration: 0.3,
                y: -10,
                boxShadow: '0 20px 40px rgba(0, 212, 255, 0.2)'
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                duration: 0.3,
                y: 0,
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)'
            });
        });
    });

    // Hover animations for skill badges
    const skillBadges = document.querySelectorAll('.skill-badge');
    skillBadges.forEach(badge => {
        badge.addEventListener('mouseenter', () => {
            gsap.to(badge, {
                duration: 0.3,
                scale: 1.1,
                y: -3
            });
        });

        badge.addEventListener('mouseleave', () => {
            gsap.to(badge, {
                duration: 0.3,
                scale: 1,
                y: 0
            });
        });
    });

    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                gsap.to(window, {
                    duration: 0.8,
                    scrollTo: {
                        y: targetSection,
                        offsetY: 80
                    },
                    ease: 'power2.inOut'
                });
            }
        });
    });

    // CTA button animations
    const ctaButtons = document.querySelectorAll('.cta-buttons .btn');
    ctaButtons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            gsap.to(btn, {
                duration: 0.3,
                scale: 1.05,
                y: -5
            });
        });

        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                duration: 0.3,
                scale: 1,
                y: 0
            });
        });
    });

    // Form input focus animations
    const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea, .contact-form select');
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            gsap.to(input, {
                duration: 0.3,
                borderColor: '#00d4ff',
                boxShadow: '0 0 0 3px rgba(0, 212, 255, 0.1)'
            });
        });

        input.addEventListener('blur', () => {
            gsap.to(input, {
                duration: 0.3,
                borderColor: 'rgba(0, 212, 255, 0.2)',
                boxShadow: 'none'
            });
        });
    });

    // Contact form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Animate form submission
            gsap.to(contactForm, {
                duration: 0.3,
                scale: 0.98,
                opacity: 0.8,
                onComplete: () => {
                    gsap.to(contactForm, {
                        duration: 0.3,
                        scale: 1,
                        opacity: 1
                    });
                    
                    // Show success message
                    const successMsg = document.createElement('div');
                    successMsg.textContent = 'Thank you! We\'ll be in touch soon.';
                    successMsg.style.cssText = `
                        padding: 1rem;
                        background: linear-gradient(135deg, #00d4ff, #7c3aed);
                        color: white;
                        border-radius: 8px;
                        margin-top: 1rem;
                        text-align: center;
                        font-weight: 600;
                    `;
                    
                    contactForm.appendChild(successMsg);
                    
                    gsap.from(successMsg, {
                        duration: 0.5,
                        opacity: 0,
                        y: 10
                    });
                    
                    // Reset form
                    setTimeout(() => {
                        contactForm.reset();
                        gsap.to(successMsg, {
                            duration: 0.5,
                            opacity: 0,
                            y: -10,
                            onComplete: () => successMsg.remove()
                        });
                    }, 3000);
                }
            });
        });
    }
}

// Add scroll-triggered glow effect to navbar
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 30px rgba(0, 212, 255, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.08)';
    }
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        gsap.to(navLinks, {
            duration: 0.3,
            opacity: navLinks.style.display === 'flex' ? 1 : 0
        });
    });
}

// Animate elements on page load
window.addEventListener('load', () => {
    // Add a subtle animation to the entire page
    gsap.from('body', {
        duration: 0.5,
        opacity: 0,
        ease: 'power2.out'
    });
});

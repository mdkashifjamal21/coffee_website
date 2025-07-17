// Scroll Animation Handler
class ScrollAnimations {
    constructor() {
        this.animatedElements = document.querySelectorAll('.scroll-animate');
        this.init();
    }

    init() {
        // Create intersection observer
        this.observer = new IntersectionObserver(
            (entries) => this.handleIntersection(entries),
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            }
        );

        // Observe all animated elements
        this.animatedElements.forEach(element => {
            this.observer.observe(element);
        });

        // Initialize navbar scroll effect
        this.initNavbarScroll();
        
        // Initialize smooth scrolling for navigation links
        this.initSmoothScrolling();
        
        // Initialize form handling
        this.initFormHandling();
    }

    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation class with a slight delay for staggered effect
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, 100);
                
                // Stop observing this element
                this.observer.unobserve(entry.target);
            }
        });
    }

    initNavbarScroll() {
        const navbar = document.querySelector('.coffee-navbar');
        let lastScrollTop = 0;

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Add/remove background opacity based on scroll
            if (scrollTop > 100) {
                navbar.style.background = 'rgba(139, 69, 19, 0.98)';
            } else {
                navbar.style.background = 'rgba(139, 69, 19, 0.95)';
            }

            lastScrollTop = scrollTop;
        });
    }

    initSmoothScrolling() {
        // Handle navigation link clicks
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                
                if (target) {
                    const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });

                    // Update active nav link
                    this.updateActiveNavLink(anchor.getAttribute('href'));
                }
            });
        });

        // Update active nav link on scroll
        window.addEventListener('scroll', () => {
            this.updateActiveNavLinkOnScroll();
        });
    }

    updateActiveNavLink(targetHref) {
        // Remove active class from all nav links
        document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
            link.classList.remove('active');
        });

        // Add active class to clicked link
        const activeLink = document.querySelector(`.navbar-nav .nav-link[href="${targetHref}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }

    updateActiveNavLinkOnScroll() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                // Remove active class from all nav links
                document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
                    link.classList.remove('active');
                });

                // Add active class to corresponding nav link
                const activeLink = document.querySelector(`.navbar-nav .nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }

    initFormHandling() {
        const contactForm = document.querySelector('.contact-form');
        
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmission(contactForm);
            });
        }
    }

    handleFormSubmission(form) {
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
        submitBtn.disabled = true;

        // Simulate form submission (replace with actual form handling)
        setTimeout(() => {
            // Show success message
            this.showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
            
            // Reset form
            form.reset();
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `alert alert-${type === 'success' ? 'success' : 'info'} alert-dismissible fade show position-fixed`;
        notification.style.cssText = `
            top: 100px;
            right: 20px;
            z-index: 9999;
            min-width: 300px;
            box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        `;
        
        notification.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;

        // Add to page
        document.body.appendChild(notification);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }
}

// Enhanced Card Hover Effects
class CardEffects {
    constructor() {
        this.init();
    }

    init() {
        // Add parallax effect to hero images
        this.initParallaxEffect();
        
        // Add tilt effect to cards
        this.initCardTiltEffect();
        
        // Add image zoom effect
        this.initImageZoomEffect();
    }

    initParallaxEffect() {
        const heroImages = document.querySelectorAll('.hero-image');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            heroImages.forEach((image, index) => {
                const rate = scrolled * -0.5;
                image.style.transform = `translateY(${rate}px)`;
            });
        });
    }

    initCardTiltEffect() {
        const cards = document.querySelectorAll('.hero-card');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 100;
                const rotateY = (centerX - x) / 100;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            });
        });
    }

    initImageZoomEffect() {
        const imageWrappers = document.querySelectorAll('.hero-image-wrapper');
        
        imageWrappers.forEach(wrapper => {
            const image = wrapper.querySelector('img');
            
            wrapper.addEventListener('mouseenter', () => {
                if (image) {
                    image.style.transform = 'scale(1.1)';
                }
            });
            
            wrapper.addEventListener('mouseleave', () => {
                if (image) {
                    image.style.transform = 'scale(1)';
                }
            });
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ScrollAnimations();
    new CardEffects();
    
    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Add resize handler for responsive adjustments
window.addEventListener('resize', () => {
    // Reset any transforms on resize
    document.querySelectorAll('.hero-card').forEach(card => {
        card.style.transform = '';
    });
});
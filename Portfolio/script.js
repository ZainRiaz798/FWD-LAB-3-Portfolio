// Portfolio JavaScript Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initScrollAnimations();
    initFormValidation();
    initSmoothScrolling();
    initNavbarScroll();
    initHobbyCards();
    initExperienceCards();
});

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add animation classes to elements
    const animatedElements = document.querySelectorAll('.card, .hobby-card, .experience-card, .education-card, .about-card, .contact-card');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Add slide-up animation to sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('slide-up');
        observer.observe(section);
    });
}

// Form Validation
function initFormValidation() {
    const form = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    // Real-time validation
    nameInput.addEventListener('input', () => validateName());
    emailInput.addEventListener('input', () => validateEmail());
    messageInput.addEventListener('input', () => validateMessage());

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        
        // Validate all fields
        if (!validateName()) isValid = false;
        if (!validateEmail()) isValid = false;
        if (!validateMessage()) isValid = false;
        
        if (isValid) {
            showSuccessMessage();
            form.reset();
            // Remove validation classes
            [nameInput, emailInput, messageInput].forEach(input => {
                input.classList.remove('is-valid', 'is-invalid');
            });
        }
    });

    function validateName() {
        const name = nameInput.value.trim();
        const nameError = document.getElementById('nameError');
        
        if (name === '') {
            nameInput.classList.add('is-invalid');
            nameInput.classList.remove('is-valid');
            nameError.textContent = 'Name is required';
            return false;
        } else {
            nameInput.classList.add('is-valid');
            nameInput.classList.remove('is-invalid');
            nameError.textContent = '';
            return true;
        }
    }

    function validateEmail() {
        const email = emailInput.value.trim();
        const emailError = document.getElementById('emailError');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (email === '') {
            emailInput.classList.add('is-invalid');
            emailInput.classList.remove('is-valid');
            emailError.textContent = 'Email is required';
            return false;
        } else if (!emailRegex.test(email)) {
            emailInput.classList.add('is-invalid');
            emailInput.classList.remove('is-valid');
            emailError.textContent = 'Please enter a valid email address';
            return false;
        } else {
            emailInput.classList.add('is-valid');
            emailInput.classList.remove('is-invalid');
            emailError.textContent = '';
            return true;
        }
    }

    function validateMessage() {
        const message = messageInput.value.trim();
        const messageError = document.getElementById('messageError');
        
        if (message === '') {
            messageInput.classList.add('is-invalid');
            messageInput.classList.remove('is-valid');
            messageError.textContent = 'Message is required';
            return false;
        } else if (message.length < 10) {
            messageInput.classList.add('is-invalid');
            messageInput.classList.remove('is-valid');
            messageError.textContent = 'Message must be at least 10 characters long';
            return false;
        } else {
            messageInput.classList.add('is-valid');
            messageInput.classList.remove('is-invalid');
            messageError.textContent = '';
            return true;
        }
    }

    function showSuccessMessage() {
        // Create success alert
        const alertDiv = document.createElement('div');
        alertDiv.className = 'alert alert-success alert-dismissible fade show position-fixed';
        alertDiv.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
        alertDiv.innerHTML = `
            <i class="bi bi-check-circle-fill me-2"></i>
            <strong>Success!</strong> Form submitted successfully!
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        document.body.appendChild(alertDiv);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (alertDiv.parentNode) {
                alertDiv.remove();
            }
        }, 5000);
    }
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                }
            }
        });
    });
}

// Navbar Scroll Effect
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove scrolled class for styling
        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Hobby Cards Interaction
function initHobbyCards() {
    const hobbyCards = document.querySelectorAll('.hobby-card');
    
    hobbyCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Experience Cards Interaction
function initExperienceCards() {
    const experienceCards = document.querySelectorAll('.experience-card, .education-card');
    
    experienceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) rotateX(5deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateX(0deg)';
        });
    });
}

// Resume Download Function
function downloadResume() {
    // Create a simple text file as placeholder for resume
    const resumeContent = `
MUHAMMAD ZAIN RIAZ
Software, Web, App, UI/UX & Graphics Designer with Video Editing Skills

CONTACT INFORMATION
Phone: +923098261850
Email: zainmalik55786@gmail.com
Instagram: https://www.instagram.com/zain.xy_?igsh=dWI2bWFlZmltd282

ABOUT ME
Passionate person to do creativity. Show skills through it. Love to explore and learn new things. 
Muslim, coder and designer who loves to design. I love creativity: learning new things, editing, 
coding to explore, and designing something unique.

HOBBIES
• Creativity
• Editing
• Coding
• Designing
• Learning New Things

WORK EXPERIENCE
• Web Developer (2022 - Present)
• Mobile App Developer (2021 - 2022)
• UI/UX Designer (2020 - 2021)
• Video Editor (2019 - 2020)

EDUCATION
• Bachelor of Science in Computer Science (2020 - 2024)
• Various Certifications in Web Development, UI/UX Design, and Video Editing
    `;
    
    const blob = new Blob([resumeContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Muhammad_Zain_Riaz_Resume.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('resumeModal'));
    modal.hide();
}

// Typing Animation for Hero Section
function initTypingAnimation() {
    const titleElement = document.querySelector('.hero-content h1');
    const titleText = titleElement.textContent;
    titleElement.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < titleText.length) {
            titleElement.textContent += titleText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    // Start typing animation after a short delay
    setTimeout(typeWriter, 1000);
}

// Parallax Effect for Hero Section
function initParallaxEffect() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-section');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Initialize additional animations
    initTypingAnimation();
    initParallaxEffect();
});

// Add CSS for navbar scroll effect
const style = document.createElement('style');
style.textContent = `
    .navbar.scrolled {
        background: rgba(102, 126, 234, 0.95) !important;
        backdrop-filter: blur(10px);
    }
    
    .navbar {
        transition: all 0.3s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
    
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
`;
document.head.appendChild(style);

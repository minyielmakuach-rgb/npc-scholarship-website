// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            closeMenu();
        }
    });
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

function closeMenu() {
    navLinks.classList.remove('active');
    if (hamburger) {
        hamburger.classList.remove('active');
    }
}

// Form submission
const applicationForm = document.getElementById('applicationForm');
const formMessage = document.getElementById('formMessage');

if (applicationForm) {
    applicationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Validate form
        if (validateForm(data)) {
            // Simulate form submission
            submitForm(data);
        }
    });
}

function validateForm(data) {
    // Check if all required fields are filled
    if (!data.fullName || !data.email || !data.phone || !data.gpa || !data.program || !data.essay) {
        showMessage('Please fill in all required fields.', 'error');
        return false;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showMessage('Please enter a valid email address.', 'error');
        return false;
    }
    
    // Validate phone number
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (!phoneRegex.test(data.phone)) {
        showMessage('Please enter a valid phone number.', 'error');
        return false;
    }
    
    // Validate GPA
    const gpa = parseFloat(data.gpa);
    if (isNaN(gpa) || gpa < 0 || gpa > 4) {
        showMessage('Please enter a valid GPA (0-4).', 'error');
        return false;
    }
    
    // Validate essay length
    if (data.essay.length < 50) {
        showMessage('Essay must be at least 50 characters long.', 'error');
        return false;
    }
    
    return true;
}

function submitForm(data) {
    // Here you would typically send the data to a server
    console.log('Form submitted with data:', data);
    
    // Simulate API call
    setTimeout(() => {
        showMessage('Your application has been submitted successfully! We will review it and contact you within 2-3 weeks.', 'success');
        applicationForm.reset();
    }, 500);
}

function showMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    
    // Auto-hide message after 5 seconds
    setTimeout(() => {
        formMessage.className = 'form-message';
    }, 5000);
}

// Scroll animation for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe program cards and stats for animation
document.querySelectorAll('.program-card, .stat, .contact-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add active state to navigation links on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add some interactivity to program cards
document.querySelectorAll('.program-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.backgroundColor = 'var(--white)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.backgroundColor = 'var(--light-bg)';
    });
});

// Initialize tooltips for form inputs
document.querySelectorAll('input, textarea, select').forEach(input => {
    input.addEventListener('focus', function() {
        this.style.borderColor = 'var(--secondary-color)';
    });
    
    input.addEventListener('blur', function() {
        this.style.borderColor = '#ddd';
    });
});

console.log('NPC Scholarship Website loaded successfully!');
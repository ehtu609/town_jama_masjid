/**
 * TOWN JAMA MASJID - FIXED EMAILJS VERSION
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('🕌 Town Jama Masjid website loaded');
    
    // Wait a bit for EmailJS to load, then initialize
    setTimeout(initializeEmailJS, 1000);
});

function initializeEmailJS() {
    console.log('🔧 Initializing EmailJS...');
    
    // Check if EmailJS is properly loaded
    if (typeof emailjs === 'undefined') {
        console.error('❌ EmailJS not loaded - check CDN');
        showFormMessage('Email service not available. Please call us directly.', 'error');
        return;
    }
    
    try {
        // Initialize EmailJS - FIXED VERSION
        emailjs.init("pi8Au8y-sgqaRjOEo");
        console.log('✅ EmailJS initialized successfully');
        setupContactForm();
    } catch (error) {
        console.error('❌ EmailJS initialization error:', error);
    }
}

function setupContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (!contactForm) {
        console.error('❌ Contact form not found!');
        return;
    }
    
    console.log('✅ Contact form found');
    
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        handleFormSubmission(this);
    });
}

function handleFormSubmission(form) {
    const submitBtn = document.getElementById('submit-btn');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    showFormMessage('Sending your message...', 'info');
    
    console.log('📧 Form data captured:', {
        name: form.name.value,
        email: form.email.value,
        phone: form.phone.value,
        message: form.message.value
    });
    
    // Send email using EmailJS - FIXED
    emailjs.send('service_sunf15q', 'template_iirfx9j', {
        name: form.name.value,
        email: form.email.value,
        phone: form.phone.value,
        message: form.message.value
    })
    .then(function(response) {
        console.log('✅ SUCCESS! Email sent. Status:', response.status);
        showFormMessage('✅ Message sent successfully! We will contact you within 24 hours.', 'success');
        form.reset();
    })
    .catch(function(error) {
        console.error('❌ Email sending failed:', error);
        console.log('Full error details:', error);
        
        showFormMessage('❌ Failed to send message. Please call us directly at +91 8920556818', 'error');
    })
    .finally(function() {
        // Reset button state
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    });
}

function showFormMessage(message, type) {
    const messageDiv = document.getElementById('form-messages');
    
    if (messageDiv) {
        messageDiv.textContent = message;
        messageDiv.className = type;
        messageDiv.style.display = 'block';
    }
}

function openRegistrationForm() {
    alert('For registration, please contact us directly at +91 8920556818');
}

// Test EmailJS connection
setTimeout(() => {
    console.log('=== CONNECTION TEST ===');
    console.log('EmailJS loaded:', typeof emailjs !== 'undefined');
    console.log('Public Key: pi8Au8y-sgqaRjOEo');
    console.log('Service ID: service_sunf15q');
    console.log('Template ID: template_iirfx9j');
}, 2000);

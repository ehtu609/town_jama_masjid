/**
 * TOWN JAMA MASJID - EMAILJS FIX WITH DEBUGGING
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('🕌 Town Jama Masjid website loaded');
    initializeEmailJS();
});

function initializeEmailJS() {
    console.log('🔧 Initializing EmailJS...');
    
    // Initialize EmailJS with your Public Key
    emailjs.init("pi8Au8y-sgqaRjOEo")
        .then(() => {
            console.log('✅ EmailJS initialized successfully');
            console.log('📧 Service ID: service_sunf15q');
            console.log('📧 Template ID: template_iirfx9j');
            setupContactForm();
        })
        .catch(error => {
            console.error('❌ EmailJS initialization failed:', error);
            showFormMessage('Email service temporarily unavailable. Please call us directly.', 'error');
        });
}

function setupContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (!contactForm) {
        console.error('❌ Contact form not found!');
        return;
    }
    
    console.log('✅ Contact form found, setting up handler...');
    
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
    
    console.log('📧 Form data:', {
        name: form.name.value,
        email: form.email.value,
        phone: form.phone.value,
        message: form.message.value
    });
    
    // Send email using EmailJS
    emailjs.sendForm('service_sunf15q', 'template_iirfx9j', form)
        .then(function(response) {
            console.log('✅ SUCCESS! Email sent:', response);
            showFormMessage('✅ Message sent successfully! We will get back to you within 24 hours.', 'success');
            form.reset();
        })
        .catch(function(error) {
            console.error('❌ Email sending failed:', error);
            
            // Show specific error messages
            if (error.text && error.text.includes('Invalid template ID')) {
                showFormMessage('❌ Template configuration error. Please contact administrator.', 'error');
            } else if (error.text && error.text.includes('Invalid service ID')) {
                showFormMessage('❌ Service configuration error. Please contact administrator.', 'error');
            } else {
                showFormMessage('❌ Failed to send message. Please try again or call us directly at +91 8920556818', 'error');
            }
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
        
        // Auto-hide success messages after 8 seconds
        if (type === 'success') {
            setTimeout(() => {
                messageDiv.style.display = 'none';
            }, 8000);
        }
    }
}

// Registration function
function openRegistrationForm() {
    alert('For registration, please contact us directly at +91 8920556818');
}

// Test function to check EmailJS connection
function testEmailJSConnection() {
    console.log('🧪 Testing EmailJS connection...');
    console.log('Public Key: pi8Au8y-sgqaRjOEo');
    console.log('Service ID: service_sunf15q');
    console.log('Template ID: template_iirfx9j');
    
    if (typeof emailjs !== 'undefined') {
        console.log('✅ EmailJS SDK loaded');
        return true;
    } else {
        console.error('❌ EmailJS SDK not loaded');
        return false;
    }
}

// Run connection test
setTimeout(testEmailJSConnection, 2000);

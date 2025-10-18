/**
 * TOWN JAMA MASJID - MAIN JAVASCRIPT FILE
 * Fixed version without conflicts
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Town Jama Masjid website loaded successfully');
    
    // Test EmailJS configuration
    testEmailJSSetup();
    
    // Initialize EmailJS after a short delay to ensure everything is loaded
    setTimeout(initializeEmailJS, 1000);
});

/**
 * TEST EMAILJS CONFIGURATION
 * Checks if EmailJS is properly set up
 */
function testEmailJSSetup() {
    console.log('🔧 Testing EmailJS configuration...');
    console.log('Public Key: pi8Au8y-sgqaRjOEo');
    console.log('Service ID: service_sunf15q');
    console.log('Template ID: template_iirfx9j');
    
    if (typeof emailjs === 'undefined') {
        console.error('❌ EmailJS SDK not loaded - check CDN link');
        return false;
    }
    console.log('✅ EmailJS SDK loaded successfully');
    return true;
}

/**
 * INITIALIZE EMAILJS SERVICE
 * Safe initialization with error handling
 */
function initializeEmailJS() {
    try {
        // Only initialize if not already initialized
        if (typeof emailjs === 'undefined') {
            console.error('❌ EmailJS not available');
            return;
        }
        
        emailjs.init("pi8Au8y-sgqaRjOEo");
        console.log('✅ EmailJS initialized successfully');
        
        // Set up the contact form
        setupContactForm();
        
    } catch (error) {
        console.error('❌ EmailJS initialization failed:', error);
    }
}

/**
 * SET UP CONTACT FORM
 * Single form handler to prevent conflicts
 */
function setupContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (!contactForm) {
        console.error('❌ Contact form not found!');
        return;
    }
    
    console.log('✅ Contact form found, setting up handler...');
    
    // Remove any existing event listeners to prevent duplicates
    contactForm.replaceWith(contactForm.cloneNode(true));
    const freshForm = document.getElementById('contact-form');
    
    freshForm.addEventListener('submit', function(event) {
        event.preventDefault();
        handleFormSubmission(this);
    });
    
    console.log('✅ Form handler setup complete');
}

/**
 * HANDLE FORM SUBMISSION
 * Processes the form and sends email
 */
function handleFormSubmission(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    showFormMessage('Sending your message...', 'info');
    
    console.log('📧 Attempting to send email...');
    
    // Send email using EmailJS
    emailjs.sendForm('service_sunf15q', 'template_iirfx9j', form)
        .then(function(response) {
            console.log('✅ SUCCESS! Email sent. Status:', response.status);
            showFormMessage('✅ Message sent successfully! We will get back to you soon.', 'success');
            form.reset();
        })
        .catch(function(error) {
            console.error('❌ FAILED to send email:', error);
            showFormMessage('❌ Failed to send message. Please try again or contact us directly.', 'error');
        })
        .finally(function() {
            // Reset button state
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
}

/**
 * SHOW FORM MESSAGE
 * Displays messages to user
 */
function showFormMessage(message, type) {
    const messageDiv = document.getElementById('form-messages');
    
    if (messageDiv) {
        messageDiv.textContent = message;
        messageDiv.className = `form-message ${type}`;
        messageDiv.style.display = 'block';

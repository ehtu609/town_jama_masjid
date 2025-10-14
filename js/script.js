/**
 * TOWN JAMA MASJID - MAIN JAVASCRIPT FILE
 * This file contains all the functionality for the mosque website
 * Including: EmailJS contact form, prayer times calculator, and general utilities
 */

// Wait for the DOM to be fully loaded before executing scripts
document.addEventListener('DOMContentLoaded', function() {
    console.log('Town Jama Masjid website loaded successfully');
    
    // Initialize all main functionalities
    initializeEmailJS();      // Set up email service
    setTodaysDate();          // Set current date in prayer calculator
    
    // Note: Carousel functionality removed as we only have one static image
});

/**
 * INITIALIZE EMAILJS SERVICE
 * Sets up the email service with your public key and configures the contact form
 */
function initializeEmailJS() {
    // Initialize EmailJS with your Public Key
    // Replace "pi8Au8y-sgqaRjOEo" with your actual EmailJS public key
    emailjs.init("pi8Au8y-sgqaRjOEo");
    console.log('EmailJS initialized successfully');
    
    // Set up the contact form event listener
    setupContactForm();
}

/**
 * SET UP CONTACT FORM
 * Handles form submission, validation, and email sending
 */
function setupContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    // Check if contact form exists on the page
    if (!contactForm) {
        console.error('Contact form not found! Check your HTML structure.');
        return;
    }
    
    // Add submit event listener to the form
    contactForm.addEventListener('submit', function(event) {
        // Prevent the default form submission
        event.preventDefault();
        
        // Get the submit button and store original text
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Show "Sending..." state and disable button
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        console.log('Attempting to send email...');
        
        /**
         * SEND EMAIL USING EMAILJS
         * Parameters:
         * - 'service_sunf15q': Your EmailJS service ID
         * - 'template_iirfx9j': Your EmailJS template ID  
         * - this: The form element containing the data
         */
        emailjs.sendForm('service_sunf15q', 'template_iirfx9j', this)
            .then(function(response) {
                // SUCCESS: Email sent successfully
                console.log('SUCCESS! Email sent:', response.status, response.text);
                showFormMessage('Message sent successfully! We will get back to you soon.', 'success');
                
                // Reset the form fields
                contactForm.reset();
                
                // Reset button to original state
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            })
            .catch(function(error) {
                // ERROR: Failed to send email
                console.error('FAILED to send email:', error);
                showFormMessage('Failed to send message. Please try again or contact us directly.', 'error');
                
                // Reset button to original state
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
    });
}

/**
 * SHOW FORM MESSAGE
 * Displays success or error messages to the user
 * @param {string} message - The message to display
 * @param {string} type - 'success' or 'error'
 */
function showFormMessage(message, type) {
    const messageDiv = document.getElementById('form-messages');
    
    if (messageDiv) {
        // Set message text and styling based on type
        messageDiv.textContent = message;
        messageDiv.className = type; // Applies 'success' or 'error' CSS class
        messageDiv.style.display = 'block';
        
        // Auto-hide message after 5 seconds
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 5000);
    }
}

/**
 * SET TODAY'S DATE
 * Pre-fills the prayer calculator date field with today's date
 */
function setTodaysDate() {
    const today = new Date();
    // Format date as YYYY-MM-DD for input type="date"
    const formattedDate = today.toISOString().split('T')[0];
    const prayerDateInput = document.getElementById('prayer-date');
    
    // Set the value if the input exists
    if (prayerDateInput) {
        prayerDateInput.value = formattedDate;
    }
}

/**
 * PRAYER TIMES CALCULATOR
 * Calculates and displays prayer times for selected date
 * Note: This uses mock data. For real implementation, connect to prayer times API
 */
function calculatePrayerTimes() {
    const dateInput = document.getElementById('prayer-date');
    
    // Validate date input
    if (!dateInput || !dateInput.value) {
        alert('Please select a date');
        return;
    }
    
    // Parse selected date and format it nicely
    const selectedDate = new Date(dateInput.value);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = selectedDate.toLocaleDateString('en-US', options);
    
    /**
     * MOCK PRAYER TIMES DATA
     * In a real implementation, you would:
     * 1. Call a prayer times API based on location coordinates
     * 2. Calculate times based on date and location
     * 3. Adjust for daylight saving time if applicable
     */
    const prayerTimes = {
        Fajr: '4:25 AM',
        Dhuhr: '12:45 PM', 
        Asr: '3:45 PM',
        Maghrib: '5:22 PM',
        Isha: '7:45 PM'
    };
    
    // Generate HTML for displaying prayer times
    let html = `<h3>Prayer Times for ${formattedDate}</h3>`;
    html += '<div class="prayer-grid" style="margin-top: 20px;">';
    
    // Loop through prayer times and create HTML for each
    for (const [prayer, time] of Object.entries(prayerTimes)) {
        html += `
            <div class="prayer-item">
                <h3>${prayer}</h3>
                <p class="jamaat-time">${time}</p>
            </div>
        `;
    }
    
    html += '</div>';
    
    // Display the generated HTML
    const calculatedTimes = document.getElementById('calculated-times');
    if (calculatedTimes) {
        calculatedTimes.innerHTML = html;
    }
}

/**
 * FUTURE ENHANCEMENTS:
 * 1. Real prayer times API integration
 * 2. Islamic date converter
 * 3. Event calendar
 * 4. Donation system
 * 5. Live prayer times based on location
 */

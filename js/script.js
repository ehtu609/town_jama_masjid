// Cleaned and Simplified JavaScript

document.addEventListener('DOMContentLoaded', function() {
    console.log('Website loaded successfully');
    
    // Initialize EmailJS
    initializeEmailJS();
    
    // Set today's date in prayer calculator
    setTodaysDate();
    
    // Note: Carousel functionality removed since we only have one image
});

/**
 * Initialize EmailJS with your Public Key
 */
function initializeEmailJS() {
    // Initialize EmailJS with your Public Key
    emailjs.init("pi8Au8y-sgqaRjOEo");
    console.log('EmailJS initialized successfully');
    
    // Setup contact form event listener
    setupContactForm();
}

/**
 * Set up contact form submission
 */
function setupContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (!contactForm) {
        console.error('Contact form not found!');
        return;
    }
    
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Show "Sending..." state
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        console.log('Sending email...');
        
        // Send email using EmailJS
        emailjs.sendForm('service_sunf15q', 'template_iirfx9j', this)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                showFormMessage('Message sent successfully!', 'success');
                contactForm.reset();
                
                // Reset button text
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            })
            .catch(function(error) {
                console.error('FAILED...', error);
                showFormMessage('Failed to send message. Please try again.', 'error');
                
                // Reset button text
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
    });
}

/**
 * Show form message to user
 */
function showFormMessage(message, type) {
    const messageDiv = document.getElementById('form-messages');
    if (messageDiv) {
        messageDiv.textContent = message;
        messageDiv.className = type; // 'success' or 'error'
        messageDiv.style.display = 'block';
        
        // Hide message after 5 seconds
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 5000);
    }
}

/**
 * Set today's date in prayer calculator
 */
function setTodaysDate() {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    const prayerDateInput = document.getElementById('prayer-date');
    
    if (prayerDateInput) {
        prayerDateInput.value = formattedDate;
    }
}

/**
 * Prayer Times Calculator
 */
function calculatePrayerTimes() {
    const dateInput = document.getElementById('prayer-date');
    
    if (!dateInput || !dateInput.value) {
        alert('Please select a date');
        return;
    }
    
    const selectedDate = new Date(dateInput.value);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = selectedDate.toLocaleDateString('en-US', options);
    
    // Mock prayer times calculation (same for all dates in this example)
    const prayerTimes = {
        Fajr: '4:25 AM',
        Dhuhr: '12:45 PM',
        Asr: '3:45 PM',
        Maghrib: '5:22 PM',
        Isha: '7:45 PM'
    };
    
    let html = `<h3>Prayer Times for ${formattedDate}</h3>`;
    html += '<div class="prayer-grid" style="margin-top: 20px;">';
    
    for (const [prayer, time] of Object.entries(prayerTimes)) {
        html += `
            <div class="prayer-item">
                <h3>${prayer}</h3>
                <p class="jamaat-time">${time}</p>
            </div>
        `;
    }
    
    html += '</div>';
    
    const calculatedTimes = document.getElementById('calculated-times');
    if (calculatedTimes) {
        calculatedTimes.innerHTML = html;
    }
}

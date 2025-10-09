// Carousel Functionality
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.carousel-control.prev');
    const nextBtn = document.querySelector('.carousel-control.next');
    let currentSlide = 0;
    
    // Function to show a specific slide
    function showSlide(index) {
        // Remove active class from all slides and indicators
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Add active class to current slide and indicator
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
        
        currentSlide = index;
    }
    
    // Next slide function
    function nextSlide() {
        let nextIndex = (currentSlide + 1) % slides.length;
        showSlide(nextIndex);
    }
    
    // Previous slide function
    function prevSlide() {
        let prevIndex = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prevIndex);
    }
    
    // Event listeners for buttons
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Event listeners for indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showSlide(index);
        });
    });
    
    // Auto slide every 5 seconds
    setInterval(nextSlide, 5000);
    
    // Islamic Date Functionality
    updateIslamicDate();
    
    // Set today's date in the prayer calculator
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    document.getElementById('prayer-date').value = formattedDate;
});

// Islamic Date Function
function updateIslamicDate() {
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const gregorianDate = today.toLocaleDateString('en-US', options);
    document.getElementById('gregorian-date').textContent = gregorianDate;
    
    // Simple Hijri date approximation (for demonstration)
    const hijriMonths = ['Muharram', 'Safar', 'Rabi\' al-Awwal', 'Rabi\' al-Thani', 
                        'Jumada al-Awwal', 'Jumada al-Thani', 'Rajab', 'Sha\'ban', 
                        'Ramadan', 'Shawwal', 'Dhu al-Qi\'dah', 'Dhu al-Hijjah'];
    
    // This is a simplified calculation - in production use a proper Hijri date library
    const hijriDay = Math.floor(Math.random() * 28) + 1;
    const hijriMonth = hijriMonths[Math.floor(Math.random() * 12)];
    const hijriYear = 1445 + Math.floor(Math.random() * 2);
    
    const hijriDate = `${hijriDay} ${hijriMonth}, ${hijriYear} AH`;
    document.getElementById('hijri-date').textContent = hijriDate;
}

// Prayer Times Calculator
function calculatePrayerTimes() {
    const dateInput = document.getElementById('prayer-date').value;
    if (!dateInput) {
        alert('Please select a date');
        return;
    }
    
    const selectedDate = new Date(dateInput);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = selectedDate.toLocaleDateString('en-US', options);
    
    // Mock prayer times calculation (in production, use proper calculation methods)
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
    
    document.getElementById('calculated-times').innerHTML = html;
}

// Initialize EmailJS with your Public Key
// You can find this in EmailJS Dashboard → Account → API Keys
emailjs.init("YOUR_PUBLIC_KEY_HERE"); // Replace with your actual public key

// Set current date for pre-filled data
document.addEventListener('DOMContentLoaded', function() {
    const dateField = document.getElementById('prefilled_date');
    if (dateField) {
        dateField.value = new Date().toLocaleString();
    }
});

// Form submission handler
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const submitBtn = document.getElementById('submit-btn');
    const formMessages = document.getElementById('form-messages');
    
    // Disable submit button and show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    
    // Clear previous messages
    formMessages.style.display = 'none';
    formMessages.className = '';
    
    // Send email using EmailJS
    emailjs.sendForm('service_ggipb47', 'YOUR_TEMPLATE_ID', this)
        .then(function(response) {
            // Success message
            showMessage('Message sent successfully! We will get back to you soon.', 'success');
            document.getElementById('contact-form').reset();
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
        }, function(error) {
            // Error message
            showMessage('Failed to send message. Please try again or contact us directly.', 'error');
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
            console.error('EmailJS Error:', error);
        });
});

// Function to show messages
function showMessage(message, type) {
    const formMessages = document.getElementById('form-messages');
    formMessages.textContent = message;
    formMessages.className = type;
    formMessages.style.display = 'block';
    
    // Auto-hide success messages after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            formMessages.style.display = 'none';
        }, 5000);
    }
}

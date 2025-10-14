// Carousel functionality
document.addEventListener('DOMContentLoaded', function() {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    const totalSlides = slides.length;

    function showSlide(n) {
        // Remove active class from all slides
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Calculate current slide
        currentSlide = (n + totalSlides) % totalSlides;
        
        // Add active class to current slide
        slides[currentSlide].classList.add('active');
        indicators[currentSlide].classList.add('active');
    }

    // Next/Previous buttons
    document.querySelector('.carousel-control.next').addEventListener('click', () => {
        showSlide(currentSlide + 1);
    });

    document.querySelector('.carousel-control.prev').addEventListener('click', () => {
        showSlide(currentSlide - 1);
    });

    // Indicator clicks
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showSlide(index);
        });
    });

    // Auto slide every 5 seconds
    setInterval(() => {
        showSlide(currentSlide + 1);
    }, 5000);
});
    
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
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    
    // Event listeners for indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showSlide(index);
        });
    });
    
    // Auto slide every 5 seconds
    setInterval(nextSlide, 5000);
    
    // Set today's date in the prayer calculator
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    const prayerDateInput = document.getElementById('prayer-date');
    if (prayerDateInput) {
        prayerDateInput.value = formattedDate;
    }
});

// Prayer Times Calculator
function calculatePrayerTimes() {
    const dateInput = document.getElementById('prayer-date');
    if (!dateInput || !dateInput.value) {
        alert('Please select a date');
        return;
    }
    
    const selectedDate = new Date(dateInput.value);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = selectedDate.toLocaleDateString('en-US', options);
    
    // Mock prayer times calculation
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

// EmailJS Initialization and Contact Form
document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS with your Public Key
    emailjs.init("pi8Au8y-sgqaRjOEo"); // Replace with your actual public key
    
    // Contact form functionality
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            // Show "Sending..." state
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Send email using EmailJS
            emailjs.sendForm('service_sunf15q', 'template_iirfx9j', this)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    submitBtn.textContent = 'Message Sent!';
                    contactForm.reset();
                    
                    // Reset button after 3 seconds
                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                    }, 3000);
                })
                .catch(function(error) {
                    console.error('FAILED...', error);
                    submitBtn.textContent = 'Failed to Send';
                    
                    // Reset button after 3 seconds
                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                    }, 3000);
                });
        });
    }
});



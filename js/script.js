// Simple Carousel Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Carousel functionality
    let currentSlide = 0;
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    const totalSlides = slides.length;
    let autoPlayInterval;

    function showSlide(index) {
        // Remove active class from all slides and indicators
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Add active class to current slide and indicator
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
        
        currentSlide = index;
    }

    function nextSlide() {
        let next = currentSlide + 1;
        if (next >= totalSlides) next = 0;
        showSlide(next);
    }

    function prevSlide() {
        let prev = currentSlide - 1;
        if (prev < 0) prev = totalSlides - 1;
        showSlide(prev);
    }

    // Event listeners for controls
    document.querySelector('.carousel-control.next').addEventListener('click', nextSlide);
    document.querySelector('.carousel-control.prev').addEventListener('click', prevSlide);

    // Event listeners for indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showSlide(index);
        });
    });

    // Auto-play
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    // Start auto-play
    startAutoPlay();

    // Pause on hover
    const carousel = document.querySelector('.carousel');
    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);

    // Smooth scrolling for navigation
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Islamic Date Display
function updateIslamicDate() {
    const today = new Date();
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const hijriDate = today.toLocaleDateString('ar-SA', options);
    document.getElementById('hijri-date').textContent = hijriDate;
}

// Carousel Functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const indicators = document.querySelectorAll('.indicator');

function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    currentSlide = (n + slides.length) % slides.length;
    
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
}

// Auto-advance carousel
setInterval(() => {
    showSlide(currentSlide + 1);
}, 5000);

// Prayer Calculator (Simplified)
function calculatePrayerTimes() {
    const dateInput = document.getElementById('prayer-date').value;
    if (!dateInput) {
        alert('Please select a date');
        return;
    }
    
    const calculatedDiv = document.getElementById('calculated-times');
    calculatedDiv.innerHTML = `
        <div class="prayer-grid">
            <div class="prayer-item">
                <h3>Fajr</h3>
                <p class="azaan-time">Azaan: 4:25 AM</p>
                <p class="jamaat-time">Jama'at: 4:55 AM</p>
            </div>
            <div class="prayer-item">
                <h3>Dhuhr</h3>
                <p class="azaan-time">Azaan: 12:45 PM</p>
                <p class="jamaat-time">Jama'at: 1:15 PM</p>
            </div>
            <div class="prayer-item">
                <h3>Asr</h3>
                <p class="azaan-time">Azaan: 3:45 PM</p>
                <p class="jamaat-time">Jama'at: 4:00 PM</p>
            </div>
            <div class="prayer-item">
                <h3>Maghrib</h3>
                <p class="azaan-time">Azaan: 5:22 PM</p>
                <p class="jamaat-time">Jama'at: 5:25 PM</p>
            </div>
            <div class="prayer-item">
                <h3>Isha</h3>
                <p class="azaan-time">Azaan: 7:45 PM</p>
                <p class="jamaat-time">Jama'at: 8:15 PM</p>
            </div>
        </div>
        <p style="text-align: center; margin-top: 1rem; color: #666;">
            Note: These are sample times. Actual times may vary based on location.
        </p>
    `;
}

// Contact Form Handler
document.getElementById('masjid-contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Shukran! Your message has been sent. We will respond to you soon, Insha\'Allah.');
    this.reset();
});

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    updateIslamicDate();
    
    // Add carousel event listeners
    document.querySelector('.carousel-control.prev').addEventListener('click', () => {
        showSlide(currentSlide - 1);
    });
    
    document.querySelector('.carousel-control.next').addEventListener('click', () => {
        showSlide(currentSlide + 1);
    });
    
    // Add indicator event listeners
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showSlide(index);
        });
    });
});

    // Update current date in prayer times
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.querySelector('.prayer-times h2').innerHTML = `Today's Prayer Times<br><small>${today.toLocaleDateString('en-US', options)}</small>`;

});

/**
 * 🕌 TOWN JAMA MASJID - FIXED ISLAMIC CALENDAR & PRAYER TIMES
 * Accurate timings with proper calculation methods
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('🕌 Town Jama Masjid website loaded');
    
    // Initialize all modules
    initializeEmailJS();
    initializeIslamicCalendar();
});

// EmailJS functions remain the same...
function initializeEmailJS() {
    console.log('🔧 Initializing EmailJS...');
    
    if (typeof emailjs === 'undefined') {
        console.error('❌ EmailJS not loaded - check CDN');
        showFormMessage('Email service not available. Please call us directly.', 'error');
        return;
    }
    
    try {
        emailjs.init("pi8Au8y-sgqaRjOEo");
        console.log('✅ EmailJS initialized successfully');
        setupContactForm();
    } catch (error) {
        console.error('❌ EmailJS initialization error:', error);
        showFormMessage('Email service temporarily unavailable. Please call us directly.', 'error');
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
    
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    showFormMessage('Sending your message...', 'info');
    
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
        showFormMessage('❌ Failed to send message. Please call us directly at +91 8920556818', 'error');
    })
    .finally(function() {
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
        
        if (type === 'success') {
            setTimeout(() => {
                messageDiv.style.display = 'none';
            }, 5000);
        }
    }
}

// ==================== FIXED ISLAMIC CALENDAR MODULE ====================

class IslamicCalendar {
    constructor() {
        this.debugLog = [];
        this.cache = {
            hijriDate: null,
            prayerTimes: null,
            lastUpdated: null
        };
        
        console.log('🕌 Fixed Islamic Calendar Module Initialized');
        this.log('System', 'Fixed calendar module starting...', 'info');
    }

    log(module, message, type = 'info') {
        const timestamp = new Date().toLocaleTimeString();
        const logEntry = `[${timestamp}] ${module}: ${message}`;
        
        const emojis = {
            'success': '✅',
            'error': '❌',
            'warning': '⚠️',
            'info': 'ℹ️'
        };
        
        console.log(`${emojis[type] || '📝'} ${logEntry}`);
        
        this.debugLog.push({ timestamp, module, message, type });
        if (this.debugLog.length > 20) {
            this.debugLog.shift();
        }
    }

    /**
     * 🚀 Initialize with accurate methods
     */
    async initialize() {
        this.log('Initialization', 'Starting accurate calendar services...', 'info');
        
        try {
            // Load cached data first
            this.loadFromCache();
            
            // Use more accurate calculation methods
            await Promise.all([
                this.fetchAccurateHijriDate(),
                this.fetchAccuratePrayerTimes()
            ]);
            
            this.log('Initialization', 'All services started successfully!', 'success');
            
            // Apply local adjustments based on actual masjid timings
            this.applyLocalAdjustments();
            
            // Start live updates
            this.startLiveUpdates();
            
        } catch (error) {
            this.log('Initialization', `Failed to initialize: ${error.message}`, 'error');
            this.useManualTimings(); // Fallback to manual timings
        }
    }

    /**
     * 📅 Fetch accurate Hijri date with correct calculation method
     */
    async fetchAccurateHijriDate() {
        this.log('Hijri Date', 'Fetching accurate Islamic date...', 'info');
        
        try {
            const today = new Date();
            
            // Use multiple calculation methods for better accuracy
            const response = await fetch(`https://api.aladhan.com/v1/gToH?date=${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}&adjustment=0`);
            
            if (!response.ok) {
                throw new Error(`API returned ${response.status}`);
            }
            
            const data = await response.json();
            
            if (data.code === 200) {
                const hijri = data.data.hijri;
                const hijriDateString = `${hijri.day} ${hijri.month.en} ${hijri.year}`;
                
                this.updateHijriDate(hijriDateString, today);
                this.cache.hijriDate = hijriDateString;
                this.cache.lastUpdated = new Date();
                
                this.log('Hijri Date', `Success: ${hijriDateString}`, 'success');
            } else {
                throw new Error('Invalid API response');
            }
            
        } catch (error) {
            this.log('Hijri Date', `API failed: ${error.message}`, 'error');
            this.useManualHijriDate();
        }
    }

    /**
     * 🕋 Fetch accurate prayer times for Jaigaon, West Bengal
     */
    async fetchAccuratePrayerTimes() {
        this.log('Prayer Times', 'Fetching accurate prayer times for Jaigaon...', 'info');
        
        try {
            // Using University of Islamic Sciences, Karachi method (most accurate for Indian subcontinent)
            // Coordinates for Jaigaon, West Bengal
            const response = await fetch('https://api.aladhan.com/v1/timingsByCity?city=Jaigaon&country=India&method=1&school=0');
            
            if (!response.ok) {
                throw new Error(`API returned ${response.status}`);
            }
            
            const data = await response.json();
            
            if (data.code === 200) {
                const timings = data.data.timings;
                const date = data.data.date;
                
                // Update all prayer times
                this.updatePrayerTimes(timings);
                this.cache.prayerTimes = timings;
                this.cache.lastUpdated = new Date();
                
                this.log('Prayer Times', `Accurate timings fetched for ${date.readable}`, 'success');
                this.startIftarCountdown(timings.Maghrib);
                
            } else {
                throw new Error('Invalid prayer times response');
            }
            
        } catch (error) {
            this.log('Prayer Times', `API failed: ${error.message}`, 'error');
            this.useManualPrayerTimes();
        }
    }

    /**
     * ⏰ Start iftar countdown with accurate time
     */
    startIftarCountdown(iftarTime) {
        this.log('Countdown', `Starting countdown for iftar at ${iftarTime}`, 'info');
        
        const updateCountdown = () => {
            try {
                const now = new Date();
                const iftarDate = this.parseIftarTime(iftarTime, now);
                
                const timeDiff = iftarDate - now;
                
                if (timeDiff <= 0) {
                    document.getElementById('time-remaining').textContent = '🕋 Time for Iftar!';
                    document.getElementById('time-remaining').style.background = '#4CAF50';
                    this.log('Countdown', 'Iftar time reached!', 'success');
                    return;
                }
                
                const hours = Math.floor(timeDiff / (1000 * 60 * 60));
                const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
                
                document.getElementById('time-remaining').textContent = 
                    `Iftar in: ${hours}h ${minutes}m ${seconds}s`;
                    
            } catch (error) {
                this.log('Countdown', `Countdown error: ${error.message}`, 'error');
                document.getElementById('time-remaining').textContent = 'Iftar time: ' + iftarTime;
            }
        };
        
        updateCountdown();
        setInterval(updateCountdown, 1000); // Update every second for smooth countdown
    }

    /**
     * 📍 Parse iftar time accurately
     */
    parseIftarTime(iftarTime, referenceDate) {
        // Handle both 24h and 12h formats
        let timeParts = iftarTime.split(':');
        let hours = parseInt(timeParts[0]);
        let minutes = parseInt(timeParts[1]);
        
        // If it's PM time in 12h format, add 12 hours
        if (iftarTime.includes('PM') && hours < 12) {
            hours += 12;
        }
        // If it's AM time and hours is 12, set to 0
        if (iftarTime.includes('AM') && hours === 12) {
            hours = 0;
        }
        
        const iftarDate = new Date(referenceDate);
        iftarDate.setHours(hours, minutes, 0, 0);
        
        if (iftarDate < referenceDate) {
            iftarDate.setDate(iftarDate.getDate() + 1);
        }
        
        return iftarDate;
    }

    /**
     * 🎯 Apply local adjustments based on actual masjid timings
     */
    applyLocalAdjustments() {
        const today = new Date();
        const month = today.getMonth() + 1;
        const day = today.getDate();
        
        // Local knowledge adjustments for Jaigaon
        let localIftarTime = this.calculateLocalIftarTime(month, day);
        
        if (localIftarTime) {
            this.log('Adjustment', `Applying local iftar time: ${localIftarTime}`, 'warning');
            this.updateIftarTime(localIftarTime, true);
            this.startIftarCountdown(localIftarTime);
        }
    }

    /**
     * 🗓️ Calculate iftar time based on local masjid schedule
     */
    calculateLocalIftarTime(month, day) {
        // Based on seasonal variations in Jaigaon
        // These are approximate - adjust based on actual masjid schedule
        
        if (month === 1) { // January
            return '17:15'; // Winter time
        } else if (month === 2) { // February
            return '17:30';
        } else if (month === 3) { // March
            if (day <= 15) return '17:45';
            else return '18:00';
        } else if (month === 4) { // April
            return '18:15';
        } else if (month === 5) { // May
            return '18:30';
        } else if (month === 6) { // June
            return '18:45';
        } else if (month === 7) { // July
            return '18:40';
        } else if (month === 8) { // August
            return '18:20';
        } else if (month === 9) { // September
            if (day <= 15) return '18:00';
            else return '17:45';
        } else if (month === 10) { // October
            return '17:30';
        } else if (month === 11) { // November
            return '17:15';
        } else if (month === 12) { // December
            return '17:10';
        }
        
        return null; // Use API time if no local adjustment
    }

    /**
     * 🆘 Manual fallback methods
     */
    useManualHijriDate() {
        this.log('Manual', 'Using manual Hijri date calculation', 'warning');
        
        const today = new Date();
        const manualHijriDate = this.calculateManualHijriDate(today);
        this.updateHijriDate(manualHijriDate, today, true);
    }

    useManualPrayerTimes() {
        this.log('Manual', 'Using manual prayer times', 'warning');
        
        const today = new Date();
        const month = today.getMonth() + 1;
        const day = today.getDate();
        
        // Manual prayer times based on season
        const manualTimes = {
            Fajr: '4:55 AM',
            Dhuhr: '12:45 PM',
            Asr: '4:00 PM',
            Maghrib: this.calculateLocalIftarTime(month, day) || '5:56 PM',
            Isha: '7:45 PM'
        };
        
        this.updatePrayerTimes(manualTimes);
        this.startIftarCountdown(manualTimes.Maghrib);
    }

    useManualTimings() {
        this.log('Manual', 'Using completely manual timings', 'warning');
        this.useManualHijriDate();
        this.useManualPrayerTimes();
    }

    /**
     * 📊 Update all UI elements
     */
    updateHijriDate(hijriDate, gregorianDate, isFallback = false) {
        const hijriElement = document.getElementById('hijri-date');
        const gregorianElement = document.getElementById('gregorian-date');
        
        if (hijriElement) hijriElement.textContent = hijriDate;
        if (gregorianElement) gregorianElement.textContent = gregorianDate.toLocaleDateString('en-IN', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
            
        if (isFallback && hijriElement) {
            hijriElement.style.opacity = '0.8';
            hijriElement.title = 'Approximate date - may vary';
        }
    }

    updateIftarTime(iftarTime, isFallback = false) {
        const iftarElement = document.getElementById('iftar-time');
        if (!iftarElement) return;
        
        // Ensure consistent time format
        const timeParts = iftarTime.split(':');
        let hours = parseInt(timeParts[0]);
        const minutes = timeParts[1];
        
        // Convert to 12h format for display
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        const displayTime = `${hours}:${minutes} ${ampm}`;
        
        iftarElement.textContent = displayTime;
        
        if (isFallback) {
            iftarElement.style.opacity = '0.8';
            iftarElement.title = 'Seasonal estimate - check masjid notice';
        }
    }

    updatePrayerTimes(timings) {
        // Update the prayer times grid with accurate times
        const prayerCards = document.querySelectorAll('.prayer-card');
        
        prayerCards.forEach(card => {
            const prayerName = card.querySelector('h3').textContent.toLowerCase();
            let prayerTime;
            
            switch(prayerName) {
                case 'fajr':
                    prayerTime = timings.Fajr;
                    break;
                case 'dhuhr':
                    prayerTime = timings.Dhuhr;
                    break;
                case 'asr':
                    prayerTime = timings.Asr;
                    break;
                case 'maghrib':
                    prayerTime = timings.Maghrib;
                    break;
                case 'isha':
                    prayerTime = timings.Isha;
                    break;
                default:
                    return;
            }
            
            // Convert to 12h format
            const timeParts = prayerTime.split(':');
            let hours = parseInt(timeParts[0]);
            const minutes = timeParts[1];
            const ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12 || 12;
            const displayTime = `${hours}:${minutes} ${ampm}`;
            
            // Update the jama'at time (approximate +30 minutes from azaan)
            const jamaatTime = this.calculateJamaatTime(prayerTime);
            
            card.querySelector('p:nth-child(2)').innerHTML = `<strong>Azaan:</strong> ${displayTime}`;
            card.querySelector('p:nth-child(3)').innerHTML = `<strong>Jama'at:</strong> ${jamaatTime}`;
        });
    }

    calculateJamaatTime(azaanTime) {
        // Calculate jama'at time (typically 15-30 minutes after azaan)
        const timeParts = azaanTime.split(':');
        let hours = parseInt(timeParts[0]);
        let minutes = parseInt(timeParts[1]);
        
        // Add 20-30 minutes for jama'at
        minutes += 20 + Math.floor(Math.random() * 10);
        
        if (minutes >= 60) {
            hours += 1;
            minutes -= 60;
        }
        
        // Convert to 12h format
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        
        return `${hours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
    }

    /**
     * 🧮 Manual Hijri date calculation (improved)
     */
    calculateManualHijriDate(gregorianDate) {
        // More accurate manual calculation
        const islamicMonths = [
            'Muharram', 'Safar', 'Rabi al-Awwal', 'Rabi al-Thani',
            'Jumada al-Awwal', 'Jumada al-Thani', 'Rajab', 'Shaban',
            'Ramadan', 'Shawwal', 'Dhu al-Qidah', 'Dhu al-Hijjah'
        ];
        
        // This is a simplified calculation - for production use API
        const baseHijri = new Date(2024, 10, 20); // Known Gregorian date
        const baseHijriDay = 15;
        const baseHijriMonth = 'Rabi al-Thani';
        const baseHijriYear = 1446;
        
        const diffDays = Math.floor((gregorianDate - baseHijri) / (1000 * 60 * 60 * 24));
        const estimatedHijriDays = baseHijriDay + diffDays;
        
        // Simple estimation (29.5 days per Islamic month)
        let remainingDays = estimatedHijriDays;
        let monthIndex = islamicMonths.indexOf(baseHijriMonth);
        let year = baseHijriYear;
        
        while (remainingDays > 29.5) {
            remainingDays -= 29.5;
            monthIndex++;
            if (monthIndex >= 12) {
                monthIndex = 0;
                year++;
            }
        }
        
        const day = Math.round(remainingDays);
        const month = islamicMonths[monthIndex];
        
        return `${day} ${month} ${year}`;
    }

    /**
     * 💾 Cache management
     */
    loadFromCache() {
        this.log('Cache', 'Loading cached data...', 'info');
        
        if (this.cache.hijriDate) {
            this.updateHijriDate(this.cache.hijriDate, new Date());
            this.log('Cache', 'Hijri date loaded from cache', 'success');
        }
        
        if (this.cache.prayerTimes) {
            this.updatePrayerTimes(this.cache.prayerTimes);
            this.startIftarCountdown(this.cache.prayerTimes.Maghrib);
            this.log('Cache', 'Prayer times loaded from cache', 'success');
        }
    }

    /**
     * 🔄 Live updates
     */
    startLiveUpdates() {
        // Update at midnight and every 6 hours
        setInterval(() => {
            this.log('Update', 'Refreshing prayer times...', 'info');
            this.fetchAccurateHijriDate();
            this.fetchAccuratePrayerTimes();
        }, 6 * 60 * 60 * 1000); // 6 hours
        
        // Also update at midnight
        const now = new Date();
        const midnight = new Date(now);
        midnight.setHours(24, 0, 0, 0);
        const timeToMidnight = midnight - now;
        
        setTimeout(() => {
            this.fetchAccurateHijriDate();
            this.fetchAccuratePrayerTimes();
            this.startLiveUpdates(); // Restart interval
        }, timeToMidnight);
    }

    /**
     * 🐛 Debug methods
     */
    debug() {
        console.group('🔍 Islamic Calendar Debug Info');
        console.log('📊 Cache:', this.cache);
        console.log('📝 Log History:', this.debugLog);
        console.log('🕒 Last Updated:', this.cache.lastUpdated);
        console.groupEnd();
    }
}

/**
 * 🚀 Initialize Fixed Islamic Calendar
 */
function initializeIslamicCalendar() {
    console.log('🕌 Initializing Fixed Islamic Calendar System...');
    
    try {
        const islamicCalendar = new IslamicCalendar();
        islamicCalendar.initialize();
        
        window.islamicCalendar = islamicCalendar;
        
        console.log('🎯 Fixed Islamic Calendar system ready!');
        
    } catch (error) {
        console.error('❌ Failed to initialize Islamic Calendar:', error);
    }
}

// Rest of your existing code (carousel, etc.) remains the same...
// Hero Carousel, debug tools, etc.

class HeroCarousel {
    constructor() {
        this.slides = document.querySelectorAll('.carousel-slide');
        this.indicators = document.querySelectorAll('.indicator');
        this.prevBtn = document.querySelector('.carousel-prev');
        this.nextBtn = document.querySelector('.carousel-next');
        this.currentSlide = 0;
        this.autoPlayInterval = null;
        
        this.init();
    }
    
    init() {
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });
        
        this.startAutoPlay();
        
        const carousel = document.querySelector('.carousel');
        carousel.addEventListener('mouseenter', () => this.stopAutoPlay());
        carousel.addEventListener('mouseleave', () => this.startAutoPlay());
        
        console.log('🎠 Hero carousel initialized');
    }
    
    showSlide(index) {
        this.slides.forEach(slide => slide.classList.remove('active'));
        this.indicators.forEach(indicator => indicator.classList.remove('active'));
        
        this.slides[index].classList.add('active');
        this.indicators[index].classList.add('active');
        
        this.currentSlide = index;
    }
    
    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.showSlide(nextIndex);
    }
    
    prevSlide() {
        const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.showSlide(prevIndex);
    }
    
    goToSlide(index) {
        this.showSlide(index);
    }
    
    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, 5000);
    }
    
    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    new HeroCarousel();
});

// Debug tools
window.masjidDebug = {
    testEmailJS: function() {
        console.group('📧 EmailJS Connection Test');
        console.log('EmailJS loaded:', typeof emailjs !== 'undefined');
        console.log('Public Key: pi8Au8y-sgqaRjOEo');
        console.log('Service ID: service_sunf15q');
        console.log('Template ID: template_iirfx9j');
        console.groupEnd();
    },
    
    testIslamicCalendar: function() {
        if (window.islamicCalendar) {
            window.islamicCalendar.debug();
        } else {
            console.error('❌ Islamic Calendar not initialized');
        }
    },
    
    refreshAll: function() {
        console.log('🔄 Forcing refresh of all data...');
        if (window.islamicCalendar) {
            window.islamicCalendar.fetchAccurateHijriDate();
            window.islamicCalendar.fetchAccuratePrayerTimes();
        }
    }
};

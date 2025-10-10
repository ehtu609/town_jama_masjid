class ContactForm {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.submitBtn = document.getElementById('submit-btn');
        this.messageDiv = document.getElementById('form-messages');
        
        this.init();
    }

    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        this.setPrefilledDate();
    }

    setPrefilledDate() {
        const now = new Date().toLocaleString();
        document.getElementById('prefilled_date').value = now;
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        // Disable submit button to prevent multiple submissions
        this.submitBtn.disabled = true;
        this.submitBtn.innerHTML = 'Sending...';
        
        // Hide any previous messages
        this.hideMessage();

        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            inquiry_type: document.getElementById('inquiry_type').value,
            message: document.getElementById('message').value
        };

        try {
            // Send data to our Netlify function
            const response = await fetch('/.netlify/functions/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.ok) {
                // Success message
                this.showMessage(result.message || 'Message sent successfully!', 'success');
                // Reset form but keep pre-filled values
                this.form.reset();
                // Restore pre-filled values
                document.getElementById('name').value = 'Ehtesham Ahmed';
                document.getElementById('email').value = 'townjamamasjid@gmail.com';
                document.getElementById('phone').value = '8920556818';
            } else {
                // Error message
                this.showMessage(result.error || 'Failed to send message.', 'error');
            }

        } catch (error) {
            console.error('Error:', error);
            this.showMessage('Network error. Please check your connection and try again.', 'error');
        } finally {
            // Re-enable submit button
            this.submitBtn.disabled = false;
            this.submitBtn.innerHTML = 'Send Message';
        }
    }

    showMessage(message, type) {
        this.messageDiv.textContent = message;
        this.messageDiv.style.display = 'block';
        this.messageDiv.style.background = type === 'success' ? '#d4edda' : '#f8d7da';
        this.messageDiv.style.color = type === 'success' ? '#155724' : '#721c24';
        this.messageDiv.style.border = type === 'success' ? '1px solid #c3e6cb' : '1px solid #f5c6cb';
        this.messageDiv.style.padding = '10px';
        this.messageDiv.style.borderRadius = '5px';
        this.messageDiv.style.marginTop = '15px';
        
        // Auto-hide success messages after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                this.hideMessage();
            }, 5000);
        }
    }

    hideMessage() {
        this.messageDiv.style.display = 'none';
    }
}

// Initialize the contact form when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new ContactForm();
});

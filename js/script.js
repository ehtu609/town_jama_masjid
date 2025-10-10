// contact.js
document.getElementById('contact-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    message: document.getElementById('message').value
  };

  try {
    const response = await fetch('/.netlify/functions/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });

    const result = await response.json();
    
    if (response.ok) {
      alert('Message sent successfully!');
      e.target.reset();
    } else {
      alert(result.error || 'Something went wrong!');
    }
  } catch (error) {
    alert('Network error. Please try again.');
  }
});

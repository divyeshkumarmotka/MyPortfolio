// Toggle navigation menu in mobile view
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
        // Close the nav menu on mobile after clicking
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    });
});

// Theme Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check local storage for saved theme
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    body.classList.add(currentTheme);
    if (currentTheme === 'dark-theme') {
        themeToggle.textContent = '🌞';
    } else {
        themeToggle.textContent = '🌙';
    }
} else {
    // Default theme based on system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        body.classList.add('dark-theme');
        themeToggle.textContent = '🌞';
    } else {
        themeToggle.textContent = '🌙';
    }
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    const isDark = body.classList.contains('dark-theme');
    themeToggle.textContent = isDark ? '🌞' : '🌙';

    // Save preference to local storage
    localStorage.setItem('theme', isDark ? 'dark-theme' : 'light-theme');
});
// Function to zoom the image and display it in full screen
function zoomImage(certificateItem) {
    // Get the certificate image
    const img = certificateItem.querySelector('.certificate-img');
    
    // Create a full-screen image element
    const fullScreenImg = document.createElement('img');
    fullScreenImg.src = img.src; // Use the same image source
    fullScreenImg.classList.add('full-screen-img');
    
    // Create a close button
    const closeButton = document.createElement('button');
    closeButton.classList.add('close-btn');
    closeButton.innerHTML = '&times;'; // Cross symbol for close button
    
    // Append the full-screen image and close button to the body
    document.body.appendChild(fullScreenImg);
    document.body.appendChild(closeButton);
    
    // Show the full-screen image
    fullScreenImg.style.display = 'block';
    
    // Close the full-screen view when the close button is clicked
    closeButton.addEventListener('click', () => {
        fullScreenImg.style.display = 'none';
        closeButton.style.display = 'none';
    });
}

// Initialize EmailJS
emailjs.init("MYc5rxvQiL4ngXEzt"); // Replace "YOUR_USER_ID" with your EmailJS user ID

// Handle form submission
document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission

    // Collect service and template IDs
    const serviceID = "service_7is7gqk"; // Replace with your EmailJS service ID
    const templateID = "template_drszimo"; // Replace with your EmailJS template ID

    // Send the form data using EmailJS
    emailjs.sendForm(serviceID, templateID, this)
        .then(
            function(response) {
                alert("Message sent successfully!");
                console.log("SUCCESS!", response.status, response.text);
            },
            function(error) {
                alert("Failed to send the message. Please try again later.");
                console.log("FAILED...", error);
            }
        );
});
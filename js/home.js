document.addEventListener('DOMContentLoaded', function() {
    // SIGN UP button alert
    const signupButton = document.querySelector('.form-button');
    if (signupButton) {
        signupButton.addEventListener('click', function(event) {
            event.preventDefault();
            alert('Please provide the following details');
            window.location.href = signupButton.href;
        });
    }

    const signupButton1 = document.querySelector('.serpa-button');
    if (signupButton1) {
        signupButton1.addEventListener('click', function(event) {
            event.preventDefault();
            alert('Please sign up/login first');
            window.location.href = signupButton1.href;
        });
    }

    // Navbar shrink on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('shrink');
        } else {
            navbar.classList.remove('shrink');
        }
    });

    // Hamburger menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navlinks = document.querySelector('.navlinks');
    if (hamburger && navlinks) {
        hamburger.addEventListener('click', function() {
            navlinks.classList.toggle('active'); // Toggle the 'active' class to show/hide the menu
        });
    }
});

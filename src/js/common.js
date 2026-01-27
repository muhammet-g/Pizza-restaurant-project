// Common library setup
import * as Popper from '@popperjs/core';
import * as bootstrap from 'bootstrap';
import Swal from 'sweetalert2';
import $ from 'jquery';

// Make libraries globally available
window.bootstrap = bootstrap;
window.Popper = Popper;
window.Swal = Swal;
window.$ = $;

console.log('All libraries loaded successfully! ✓');

// Fix navbar toggle - close on link click
document.addEventListener('DOMContentLoaded', function () {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navLinks = document.querySelectorAll('.nav-link');

    // Close navbar when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            if (navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        });
    });

    // Close navbar when clicking outside
    document.addEventListener('click', function (event) {
        if (!event.target.closest('.navbar') && navbarCollapse.classList.contains('show')) {
            navbarToggler.click();
        }
    });
});

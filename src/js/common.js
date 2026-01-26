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

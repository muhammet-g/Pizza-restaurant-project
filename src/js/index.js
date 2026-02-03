// Import main SCSS file
import '../scss/main.scss';

// Import common libraries
import './common.js';

// Import SPA logic
import './spa.js';

// Import module functions
import { initializeFooter } from './footer.js';
import { initializeCart } from './cart.js';
import { initializeReplyForms, initializeCommentForm } from './comments.js';

// Initialize all modules
initializeFooter();
initializeCart();
initializeReplyForms();
initializeCommentForm();


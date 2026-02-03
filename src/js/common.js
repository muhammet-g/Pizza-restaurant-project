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

// Dynamic theming system - extract type from URL and apply body class
function applyDynamicTheme() {
    const params = new URLSearchParams(window.location.search);
    const type = params.get('type');

    if (!type) return;

    const themeMap = {
        veggie: 'theme-veggie',
        vegetable: 'theme-veggie',
        margarita: 'theme-margarita',
        cheese: 'theme-cheese',
        chicken: 'theme-meat',
        meat: 'theme-meat'
    };

    const themeClass = themeMap[type.toLowerCase()];
    if (themeClass) {
        document.body.classList.add(themeClass);
        console.log(`Theme applied: ${themeClass}`);
    }
}

document.addEventListener('DOMContentLoaded', applyDynamicTheme);

// Dynamic pizza data - maps URL type to pizza details
const pizzaData = {
    veggie: {
        name: 'بيتزا الخضروات المميزة',
        description: 'مزيج صحي من الخضار الطازة المشكلة، فلفل ملون، باذنجان، وزيتون أسود. خيار مثالي للصحة والمذاق.'
    },
    vegetable: {
        name: 'بيتزا الخضروات المميزة',
        description: 'مزيج صحي من الخضار الطازة المشكلة، فلفل ملون، باذنجان، وزيتون أسود. خيار مثالي للصحة والمذاق.'
    },
    margarita: {
        name: 'بيتزا مارجريت',
        description: 'بيتزا طازة بصلصة الطماطم الطبيعية، جبن موتزاريلا ممتازة، وأوراق باسيليكو طازة. لذة كلاسيكية بكل لقمة.'
    },
    cheese: {
        name: 'بيتزا الجبن الفاخرة',
        description: 'ثلاث أنواع من الجبن الممتاز (موتزاريلا وشيدر وريكوتا)، مع صلصة بيضاء دسمة. جنة الجبن في كل قضمة.'
    },
    chicken: {
        name: 'بيتزا الدجاج المشوي',
        description: 'دجاج مشوي طري مع صلصة باربيكيو، بصل وفلفل حار. مزيج شهي يجمع بين النكهات الرائعة.'
    },
    meat: {
        name: 'بيتزا اللحم الفاخرة',
        description: 'خليط فاخر من الأنشوفة والبيبروني واللحم المفروم، مع صلصة الطماطم الغنية والجبن الذائب. لعشاق اللحوم.'
    }
};

// Update pizza name and description based on URL type
function updatePizzaContent() {
    const params = new URLSearchParams(window.location.search);
    const type = params.get('type');

    if (!type) return;

    const pizza = pizzaData[type.toLowerCase()];
    if (pizza) {
        const nameEl = document.querySelector('.pizza-name');
        const descEl = document.querySelector('.pizza-description');

        if (nameEl) nameEl.textContent = pizza.name;
        if (descEl) descEl.textContent = pizza.description;

        console.log(`Pizza updated: ${pizza.name}`);
    }
}

document.addEventListener('DOMContentLoaded', updatePizzaContent);

// Fix navbar toggle - close on link click
document.addEventListener('DOMContentLoaded', function () {
    const navbar = document.querySelector('.navbar');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    // Guard against pages without a navbar
    if (!navbar || !navbarCollapse) return;

    const navLinks = navbar.querySelectorAll('.nav-link');
    const collapse = new bootstrap.Collapse(navbarCollapse, { toggle: false });

    const closeMenu = () => {
        if (navbarCollapse.classList.contains('show')) {
            collapse.hide();
        }
    };

    // Close navbar when a link is clicked
    navLinks.forEach(link => link.addEventListener('click', closeMenu));

    // Close navbar when clicking outside
    document.addEventListener('click', function (event) {
        if (!event.target.closest('.navbar')) {
            closeMenu();
        }
    });

    // Close on ESC for accessibility
    document.addEventListener('keyup', function (event) {
        if (event.key === 'Escape') {
            closeMenu();
        }
    });
});

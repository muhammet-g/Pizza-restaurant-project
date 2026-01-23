// استيراد ملف SCSS الرئيسي
import '../scss/main.scss';

// استيراد Popper.js
import * as Popper from '@popperjs/core';

// استيراد Bootstrap JS
import * as bootstrap from 'bootstrap';

// جعل Bootstrap متاح عالمياً
window.bootstrap = bootstrap;
window.Popper = Popper;

// استيراد jQuery
import $ from 'jquery';
window.$ = $;

console.log('جميع المكتبات تم تحميلها بنجاح! ✓');

// ========== Carousel Functionality ==========
window.addEventListener('load', function () {
    const carouselElement = document.getElementById('pizzaCarousel');

    if (carouselElement) {
        try {
            const carousel = new bootstrap.Carousel(carouselElement, {
                interval: 3000,
                wrap: true,
                touch: true,
                pause: false
            });

            // Keyboard navigation
            document.addEventListener('keydown', function (e) {
                if (e.key === 'ArrowLeft') {
                    carousel.prev();
                } else if (e.key === 'ArrowRight') {
                    carousel.next();
                }
            });

            console.log('✓ نظام الكاروسيل تم تفعيله بنجاح');
        } catch (error) {
            console.error('خطأ في تهيئة الكاروسيل:', error);
        }
    }
});

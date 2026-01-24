// استيراد ملف SCSS الرئيسي
import '../scss/main.scss';

// استيراد Popper.js
import * as Popper from '@popperjs/core';

// استيراد Bootstrap JS
import * as bootstrap from 'bootstrap';

// استيراد Sweetalert2
import Swal from 'sweetalert2';

// جعل Bootstrap و Sweetalert2 متاح عالمياً
window.bootstrap = bootstrap;
window.Popper = Popper;
window.Swal = Swal;

// استيراد jQuery
import $ from 'jquery';
window.$ = $;

console.log('جميع المكتبات تم تحميلها بنجاح! ✓');

// ========== Footer Year ==========
// إدراج السنة الحالية في الفوتر
document.addEventListener('DOMContentLoaded', function () {
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});

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

// ========== Add to Cart Example ==========
// مثال على استخدام Sweetalert2 عند إضافة منتج للسلة
document.addEventListener('DOMContentLoaded', function () {
    const addToCartButtons = document.querySelectorAll('.card .btn');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();

            const cardTitle = this.closest('.card').querySelector('.title').textContent;

            Swal.fire({
                icon: 'success',
                title: 'تمت الإضافة!',
                text: `تم إضافة ${cardTitle} إلى سلة الطلبات`,
                confirmButtonText: 'موافق',
                confirmButtonColor: '#771C1C',
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: true
            });
        });
    });
});

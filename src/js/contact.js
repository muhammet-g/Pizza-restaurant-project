// Contact Form
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value.trim();

        // بسيط: تحقق من عدم ترك حقول فارغة
        if (!name || !email || !phone || !subject || !message) {
            showError('جميع الحقول مطلوبة');
            return;
        }

        // تحقق من البريد الإلكتروني
        if (!email.includes('@')) {
            showError('البريد الإلكتروني غير صحيح');
            return;
        }

        // تحقق من الرسالة
        if (message.length < 10) {
            showError('الرسالة يجب أن تكون 10 أحرف على الأقل');
            return;
        }

        // تحقق من الهاتف (قبول أي رقم من 8 أرقام فما فوق)
        const phoneOnly = phone.replace(/\D/g, '');
        if (phoneOnly.length < 8) {
            showError('رقم الهاتف يجب أن يحتوي على 8 أرقام على الأقل');
            return;
        }

        // إرسال البيانات
        saveMessage({ name, email, phone, subject, message });
        form.reset();

        // عرض رسالة النجاح من SweetAlert
        window.Swal.fire({
            icon: 'success',
            title: 'تم الإرسال!',
            text: 'تم إرسال الرسالة بنجاح! سنتواصل معك قريباً.',
            confirmButtonText: 'موافق',
            confirmButtonColor: '#771C1C',
            timer: 3000,
            timerProgressBar: true
        });
    });
});

// حفظ الرسالة
function saveMessage(data) {
    let messages = JSON.parse(localStorage.getItem('messages')) || [];
    messages.push({ ...data, date: new Date().toLocaleDateString('ar') });
    localStorage.setItem('messages', JSON.stringify(messages));
}

// عرض رسالة الخطأ
function showError(message) {
    window.Swal.fire({
        icon: 'error',
        title: 'خطأ!',
        text: message,
        confirmButtonText: 'موافق',
        confirmButtonColor: '#771C1C'
    });
}

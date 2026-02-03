// Toggle Like Button
window.toggleLike = function (button) {
    button.classList.toggle('liked');
    const likeCount = button.querySelector('.like-count');
    let count = parseInt(likeCount.textContent);

    if (button.classList.contains('liked')) {
        likeCount.textContent = count + 1;
        button.style.color = '#dc3545';
    } else {
        likeCount.textContent = count - 1;
        button.style.color = '#666';
    }
};

// Toggle Reply Form
window.toggleReplyForm = function (button) {
    const commentCard = button.closest('.comment-card');
    const replyForm = commentCard.querySelector('.reply-form');

    replyForm.classList.toggle('d-none');

    if (!replyForm.classList.contains('d-none')) {
        replyForm.querySelector('input').focus();
    }
};

// Handle Reply Form Submission
export function initializeReplyForms() {
    document.addEventListener('DOMContentLoaded', function () {
        const replyForms = document.querySelectorAll('.reply-form-content');

        replyForms.forEach(form => {
            form.addEventListener('submit', function (e) {
                e.preventDefault();

                const name = form.querySelector('input').value;
                const reply = form.querySelector('textarea').value;

                if (name.trim() && reply.trim()) {
                    window.Swal.fire({
                        icon: 'success',
                        title: 'تم إرسال الرد!',
                        text: `شكراً على ردك يا ${name}`,
                        confirmButtonText: 'موافق',
                        confirmButtonColor: '#dc3545',
                        timer: 2000,
                        timerProgressBar: true
                    });

                    form.reset();
                    const replyFormContainer = form.closest('.reply-form');
                    replyFormContainer.classList.add('d-none');
                }
            });
        });
    });
}

// دالة مساعدة لإنشاء HTML للتعليق
function createCommentHTML(name, rating, comment) {
    let stars = '';
    const fullStars = parseInt(rating);
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star text-warning"></i>';
    }
    for (let i = fullStars; i < 5; i++) {
        stars += '<i class="far fa-star text-warning"></i>';
    }

    return `
        <div class="comment-card p-3 mb-3">
            <div class="comment-header d-flex justify-content-between align-items-center mb-2">
                <h5 class="comment-author mb-0">${name}</h5>
                <small class="comment-date text-muted">الآن</small>
            </div>
            <div class="comment-rating mb-2">
                ${stars}
            </div>
            <p class="comment-text">"${comment}"</p>
            <div class="comment-actions d-flex gap-3 mt-3">
                <button class="comment-like-btn" onclick="toggleLike(this)">
                    <i class="far fa-thumbs-up"></i> <span class="like-count">0</span> إعجاب
                </button>
                <button class="comment-reply-btn" onclick="toggleReplyForm(this)">
                    <i class="fas fa-reply"></i> الرد
                </button>
            </div>
            <div class="reply-form mt-3 d-none">
                <form class="reply-form-content p-3">
                    <input type="text" class="form-control mb-2" placeholder="اسمك" required>
                    <textarea class="form-control mb-2" rows="2" placeholder="ردك..." required></textarea>
                    <button type="submit" class="btn btn-sm btn-danger">إرسال الرد</button>
                    <button type="button" class="btn btn-sm btn-secondary ms-2" onclick="toggleReplyForm(this)">إلغاء</button>
                </form>
            </div>
        </div>
    `;
}

// دالة موحدة لمعالجة إرسال التعليق
function handleCommentSubmit(form, containerSelector) {
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = form.querySelector('input[type="text"]').value;
        const rating = form.querySelector('select').value;
        const comment = form.querySelector('textarea').value;

        if (name.trim() && rating && comment.trim()) {
            const newCommentHTML = createCommentHTML(name, rating, comment);
            const container = document.querySelector(containerSelector);

            if (container) {
                container.insertAdjacentHTML('afterbegin', newCommentHTML);

                window.Swal.fire({
                    icon: 'success',
                    title: 'تم إضافة تعليقك!',
                    text: `شكراً على تعليقك يا ${name}`,
                    confirmButtonText: 'موافق',
                    confirmButtonColor: '#771C1C',
                    timer: 2000,
                    timerProgressBar: true
                });

                form.reset();

                // إضافة مستمع للرد على التعليق الجديد
                attachReplyHandler(container.querySelector('.comment-card:first-child'));
            }
        }
    });
}

// دالة لإضافة مستمع للرد
function attachReplyHandler(commentCard) {
    const replyForm = commentCard.querySelector('.reply-form-content');
    if (replyForm) {
        replyForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const name = this.querySelector('input').value;
            const reply = this.querySelector('textarea').value;

            if (name.trim() && reply.trim()) {
                window.Swal.fire({
                    icon: 'success',
                    title: 'تم إرسال الرد!',
                    text: `شكراً على ردك يا ${name}`,
                    confirmButtonText: 'موافق',
                    confirmButtonColor: '#dc3545',
                    timer: 2000,
                    timerProgressBar: true
                });
                this.reset();
                this.closest('.reply-form').classList.add('d-none');
            }
        });
    }
}

// Handle Comment Form Submission
export function initializeCommentForm() {
    document.addEventListener('DOMContentLoaded', function () {
        // نموذج التعليق العام في صفحة الشبكة
        const mainForm = document.getElementById('commentForm');
        if (mainForm) {
            handleCommentSubmit(mainForm, '.comments .col-12.col-md-8.mx-auto');
        }

        // نماذج التعليقات لكل نوع بيتزا
        const pizzaForms = [
            { id: 'commentFormVeggie', type: 'veggie' },
            { id: 'commentFormMargarita', type: 'margarita' },
            { id: 'commentFormChicken', type: 'chicken' }
        ];

        pizzaForms.forEach(({ id, type }) => {
            const form = document.getElementById(id);
            if (form) {
                handleCommentSubmit(form, `[data-pizza-comments="${type}"] .col-12.col-md-8.mx-auto`);
            }
        });
    });
}

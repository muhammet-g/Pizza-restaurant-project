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

// Handle Comment Form Submission
export function initializeCommentForm() {
    document.addEventListener('DOMContentLoaded', function () {
        const commentForm = document.getElementById('commentForm');

        if (commentForm) {
            commentForm.addEventListener('submit', function (e) {
                e.preventDefault();

                const name = document.getElementById('commentName').value;
                const email = document.getElementById('commentEmail').value;
                const rating = document.getElementById('commentRating').value;
                const comment = document.getElementById('commentText').value;

                if (name.trim() && email.trim() && rating && comment.trim()) {
                    // Create star rating
                    let stars = '';
                    for (let i = 0; i < rating; i++) {
                        stars += '<i class="fas fa-star text-warning"></i>';
                    }

                    // Create new comment HTML
                    const newCommentHTML = `
                        <div class="comment-card p-3 mb-3">
                            <div class="comment-header d-flex justify-content-between align-items-center mb-2">
                                <h5 class="comment-author mb-0">${name}</h5>
                                <small class="comment-date text-muted">الآن</small>
                            </div>
                            <div class="comment-rating mb-2">
                                ${stars}
                            </div>
                            <p class="comment-text">
                                "${comment}"
                            </p>
                            <div class="comment-actions d-flex gap-3 mt-3">
                                <button class="comment-like-btn" onclick="toggleLike(this)">
                                    <i class="far fa-thumbs-up"></i> <span class="like-count">0</span> إعجاب
                                </button>
                                <button class="comment-reply-btn" onclick="toggleReplyForm(this)">
                                    <i class="fas fa-reply"></i> الرد
                                </button>
                            </div>
                            <!-- Reply Form -->
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

                    // Find the comments container and add new comment at the end
                    const commentsContainer = document.querySelector('.comments .col-12.col-md-8.mx-auto');
                    const commentCards = commentsContainer.querySelector('.row.mb-5');

                    // Insert new comment before the comment form section
                    commentCards.insertAdjacentHTML('beforeend', newCommentHTML);

                    // Show success message
                    window.Swal.fire({
                        icon: 'success',
                        title: 'تم إضافة تعليقك!',
                        text: `شكراً على تعليقك يا ${name}`,
                        confirmButtonText: 'موافق',
                        confirmButtonColor: '#771C1C',
                        timer: 2000,
                        timerProgressBar: true
                    });

                    // Reset form
                    commentForm.reset();

                    // Attach event listener to new reply form
                    const newReplyForm = commentCards.querySelector('.comment-card:last-child .reply-form-content');
                    if (newReplyForm) {
                        newReplyForm.addEventListener('submit', function (e) {
                            e.preventDefault();
                            const replyName = this.querySelector('input').value;
                            const replyText = this.querySelector('textarea').value;

                            if (replyName.trim() && replyText.trim()) {
                                window.Swal.fire({
                                    icon: 'success',
                                    title: 'تم إرسال الرد!',
                                    text: `شكراً على ردك يا ${replyName}`,
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
            });
        }
    });
}

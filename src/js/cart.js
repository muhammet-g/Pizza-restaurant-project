// Handle add to cart functionality
export function initializeCart() {
    document.addEventListener('DOMContentLoaded', function () {
        const addToCartButtons = document.querySelectorAll('.card .btn');

        addToCartButtons.forEach(button => {
            button.addEventListener('click', function (e) {
                e.preventDefault();

                const cardTitle = this.closest('.card').querySelector('.title').textContent;

                window.Swal.fire({
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
}

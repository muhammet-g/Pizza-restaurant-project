// Insert current year in footer
export function initializeFooter() {
    document.addEventListener('DOMContentLoaded', function () {
        const yearElement = document.getElementById('year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    });
}

// =====================
// SPA Logic - Pizza Grid vs Detail Views
// =====================

function initializePizzaSPA() {
    const params = new URLSearchParams(window.location.search);
    const type = params.get('type');
    const gridView = document.getElementById('pizzaGridView');
    const detailView = document.getElementById('pizzaDetailView');
    const detailMain = document.getElementById('pizzaDetailsMain');
    const gridCards = document.querySelectorAll('.pizza-grid-card');
    const commentsDetailSection = document.getElementById('pizzaCommentsDetail');

    // On page load: show grid if no type param, show detail if type param exists
    if (!type) {
        // Show grid, hide detail
        if (gridView) gridView.classList.remove('hidden');
        if (detailView) detailView.classList.add('hidden');
        if (detailMain) detailMain.classList.add('hidden');
        if (commentsDetailSection) commentsDetailSection.classList.add('hidden');
    } else {
        // Show detail, hide grid
        if (gridView) gridView.classList.add('hidden');
        if (detailView) detailView.classList.remove('hidden');
        if (detailMain) detailMain.classList.remove('hidden');

        // Show comments section for the specific pizza type
        if (commentsDetailSection) {
            commentsDetailSection.classList.remove('hidden');

            // Hide all pizza comment panels
            const allPizzaPanels = document.querySelectorAll('.pizza-comment-panel');
            allPizzaPanels.forEach(panel => panel.classList.add('hidden'));

            // Show the correct pizza comment panel based on type
            const currentPanel = document.querySelector(`[data-pizza-comments="${type}"]`);
            if (currentPanel) {
                currentPanel.classList.remove('hidden');
            }
        }
    }

    // Grid cards: clicking navigates to detail view
    gridCards.forEach(card => {
        card.addEventListener('click', function () {
            const pizzaType = this.getAttribute('data-pizza-type');
            window.location.href = `pizza.html?type=${pizzaType}`;
        });
    });

}

document.addEventListener('DOMContentLoaded', initializePizzaSPA);

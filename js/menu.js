document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const hasDropdowns = document.querySelectorAll('.has-dropdown');

    // 1. Menu Hambúrguer (Mobile)
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true' || false;
            this.setAttribute('aria-expanded', !isExpanded);
            mainNav.classList.toggle('is-open');
            document.body.classList.toggle('menu-open'); // Para evitar scroll no body
        });
    }

    // 2. Dropdown Menu (Mobile/Tablet)
    hasDropdowns.forEach(item => {
        const dropdownLink = item.querySelector('a');
        const dropdownMenu = item.querySelector('.dropdown-menu');

        if (dropdownLink && dropdownMenu) {
            // Adicionar funcionalidade de clique para mobile/tablet
            dropdownLink.addEventListener('click', (e) => {
                // Se o menu principal estiver aberto (mobile) e for um link de dropdown
                if (mainNav.classList.contains('is-open') && item.classList.contains('has-dropdown')) {
                    e.preventDefault();
                    dropdownMenu.classList.toggle('is-open');
                }
            });
        }
    });
});

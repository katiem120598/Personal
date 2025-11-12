(function() {
    const button = document.querySelector('.dropdown-button');
    const menu = document.querySelector('.navlist');
    const menuLinks = document.querySelectorAll('.navlist li');
    
    if (!button || !menu) return;

    function updateMenuVisibility() {
        const isMobile = window.innerWidth < 800;
        if (isMobile) {
            button.classList.add('menu-container');
            menu.style.display = 'none';
        } else {
            button.classList.remove('menu-container');
            menu.style.display = 'flex';
        }
    }

    button.addEventListener('click', function(e) {
        e.stopPropagation();
        menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
    });

    document.addEventListener('click', function(event) {
        if (!menu.contains(event.target) && !button.contains(event.target) && window.innerWidth < 800) {
            menu.style.display = 'none';
        }
    });

    menuLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            if (window.innerWidth < 800) {
                menu.style.display = 'none';
            }
        });
    });

    updateMenuVisibility();
    window.addEventListener('resize', updateMenuVisibility);
})();
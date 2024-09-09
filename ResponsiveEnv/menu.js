function handleMenu() {
    const button = document.querySelector('.dropdown-button');
    const menu = document.querySelector('.navlist');
    const menuLinks = document.querySelectorAll('.navlist li');

    // Check the screen width and add/remove 'menu-container' class accordingly
        button.classList.add('menu-container');
        menu.style.display = 'none'; // Hide the menu initially

    // Toggle the menu when the button is clicked
    button.addEventListener('click', function (event) {
        if (button.contains(event.target)) {
            menu.style.display = 'block'; // Display the menu vertically
        } else {
            menu.style.display = 'none';
        }
    });

    // Close the menu when clicking outside of it
    document.addEventListener('click', function (event) {
        if (!menu.contains(event.target) && !button.contains(event.target)) {
            menu.style.display = 'none';
        }
    });

    // Close the menu when clicking on a menu item
    menuLinks.forEach(function (link) {
        link.addEventListener('click', function () {
                menu.style.display = 'none';
        });
    });
}

// Call the function to initialize the menu behavior
handleMenu();

// Add an event listener to handle resizing and reinitializing the menu behavior
window.addEventListener('resize', handleMenu);
    // Function to change the image source
    function changeImageOnScroll() {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Get the image element
        var image = document.querySelector('.explodelogo');
        if (scrollTop > 70) { // Adjust this value as needed
            image.src = 'assets/images/pinkexplode.png'; // Change to your new image pat
        } else {
            image.src = 'assets/images/explosion_bubble.png'; // Original image path
        }
    }

    // Add scroll event listener to window
    window.addEventListener('scroll', changeImageOnScroll);
document.addEventListener("DOMContentLoaded", function () {
    const preloader = document.getElementById("preloader");
    const loadingText = document.getElementById("loading-text");

    let dotCount = 0;

    // Animate dots
    const dotAnimation = setInterval(() => {
        dotCount = (dotCount + 1) % 4; // Loops between 0, 1, 2, 3
        loadingText.textContent = "loading" + ".".repeat(dotCount);
    }, 100);

    // Remove the preloader when everything is fully loaded
    window.onload = function () {
        clearInterval(dotAnimation);
        preloader.classList.add("preloader-hidden");
        setTimeout(() => {
            preloader.style.display = "none"; // Fully remove from DOM
        }, 500);
    };
});

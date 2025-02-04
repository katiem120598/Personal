document.addEventListener("DOMContentLoaded", function () {
    const preloader = document.getElementById("preloader");
    const loadingText = document.getElementById("loading-text");
    const pageKey = "hasVisited_" + window.location.pathname;
    const startTime = performance.now(); // Track when loading starts

    // Check if the user has already visited this specific page
    const hasVisitedBefore = sessionStorage.getItem(pageKey);

    if (hasVisitedBefore) {
        console.log(`âœ… ${window.location.pathname} has already been visited, skipping preloader and refresh.`);
        preloader.style.display = "none"; // Hide preloader instantly
        return; // Exit early to avoid animations and reload logic
    }

    let dotCount = 0;

    // Animate dots while preloading
    const dotAnimation = setInterval(() => {
        dotCount = (dotCount + 1) % 4;
        loadingText.textContent = "loading" + ".".repeat(dotCount);
    }, 100);

    window.onload = function () {
        const loadTime = performance.now() - startTime; // Calculate total load time
        console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);

        // If load time is < 500ms, hide preloader immediately
        if (loadTime < 1000) {
            console.log("Fast load detected, skipping preloader...");
            preloader.style.display = "none";
            clearInterval(dotAnimation);
            return;
        }

        // Remove preloader smoothly
        clearInterval(dotAnimation);
        preloader.classList.add("preloader-hidden");

        setTimeout(() => {
            preloader.style.display = "none"; // Remove preloader from DOM
            console.log("Preloader removed. Page is visible.");

            // Mark this page as visited *before* triggering the refresh
            sessionStorage.setItem(pageKey, "true");

            console.log(`ðŸ”„ Refreshing ${window.location.pathname} now after preloader disappears...`);
            location.reload(); // Force a visible refresh only once
        }, 500); // Smooth transition for preloader removal
    };
});

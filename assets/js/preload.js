document.addEventListener("DOMContentLoaded", function () {
    const preloader = document.getElementById("preloader");
    const loadingText = document.getElementById("loading-text");
    const pageKey = "hasRefreshed_" + window.location.pathname;
    const startTime = performance.now(); // Track when loading starts

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
        if (loadTime < 500) {
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

            // Check if *this specific page* has already refreshed
            if (!sessionStorage.getItem(pageKey)) {
                sessionStorage.setItem(pageKey, "true"); // Mark this page as refreshed

                console.log(`🔄 Refreshing ${window.location.pathname} now after preloader disappears...`);
                location.reload(); // Force a visible refresh
            } else {
                console.log(`✅ ${window.location.pathname} has already been refreshed once, skipping refresh.`);
            }
        }, 500); // Smooth transition for preloader removal
    };
});

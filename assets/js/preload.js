document.addEventListener("DOMContentLoaded", function () {
    const preloader = document.getElementById("preloader");
    const loadingText = document.getElementById("loading-text");

    let dotCount = 0;
    const pageKey = "hasRefreshed_" + window.location.pathname;

    // Animate dots while preloading
    const dotAnimation = setInterval(() => {
        dotCount = (dotCount + 1) % 4;
        loadingText.textContent = "loading" + ".".repeat(dotCount);
    }, 100);

    // Check if the page has been refreshed before
    if (!sessionStorage.getItem(pageKey)) {
        console.log(`🔄 First visit to ${window.location.pathname}, refreshing now...`);
        sessionStorage.setItem(pageKey, "true"); // Mark it as refreshed
        location.reload(); // Refresh immediately before removing preloader
    } else {
        console.log(`✅ ${window.location.pathname} has already been refreshed, skipping refresh.`);
        
        window.onload = function () {
            console.log("Page fully loaded after refresh! Removing preloader...");
            clearInterval(dotAnimation);
            preloader.classList.add("preloader-hidden");

            setTimeout(() => {
                preloader.style.display = "none"; // Remove preloader from DOM
                console.log("Preloader removed. Page is now visible.");
            }, 500); // Smooth transition for preloader removal
        };
    }
});

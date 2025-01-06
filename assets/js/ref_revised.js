document.addEventListener("DOMContentLoaded", function () {
    const referenceImage = document.querySelector("img.reference-image");
    const tabsContainer = document.querySelector(".tabs-container");
    const tabImages = document.querySelectorAll(".tab-image");

    const updatePositions = () => {
        if (referenceImage && tabsContainer) {
            // Get the intrinsic dimensions of the reference image
            const referenceHeight = referenceImage.naturalHeight; // The original height of the image
            const referenceWidth = referenceImage.naturalWidth; // The original width of the image
            const scalingFactor = referenceImage.clientHeight / referenceHeight; // How much the image is scaled

            // Get the visible dimensions of the reference image
            const visibleHeight = referenceImage.clientHeight;
            const referenceRect = referenceImage.getBoundingClientRect();

            if (visibleHeight === 0) {
                console.warn("Reference image is not visible.");
                return;
            }

            // Position the tabs container relative to the reference image
            tabsContainer.style.position = "absolute";
            tabsContainer.style.top = `${referenceRect.top}px`; // Align to the top of the reference image
            tabsContainer.style.left = `${referenceRect.right}px`; // Stick to the right of the reference image
            //tabsContainer.style.height = `${visibleHeight}px`; // Match the scaled height of the reference image

            // Adjust tab image sizes based on the scaled reference image
            const tabHeight = scalingFactor * referenceHeight * 0.2; // Tabs are 20% of the scaled reference image height
            tabImages.forEach((tabImage) => {
                tabImage.style.height = `${tabHeight}px`; // Dynamically set the height of each tab
                tabImage.style.width = "auto"; // Maintain aspect ratio
                tabImage.style.display = "block"; // Ensure proper block-level layout
                tabImage.style.marginBottom = `${0.02 * visibleHeight}px`; // Add a small gap between tabs
            });

            console.log("Tabs Updated:", {
                naturalHeight: referenceHeight,
                scalingFactor: scalingFactor,
                visibleHeight: visibleHeight,
                tabHeight: tabHeight,
                referenceTop: referenceRect.top,
                referenceRight: referenceRect.right,
            });
        }
    };

    const handleImageLoad = () => {
        if (referenceImage.complete) {
            updatePositions();
        } else {
            referenceImage.addEventListener("load", updatePositions);
        }
    };

    // Use ResizeObserver for dynamic resizing
    const resizeObserver = new ResizeObserver(() => {
        console.log("ResizeObserver triggered");
        updatePositions();
    });

    if (referenceImage) {
        resizeObserver.observe(referenceImage);
    }

    // Initial setup
    handleImageLoad();

    // Update on window resize
    window.addEventListener("resize", () => {
        console.log("Window resize triggered");
        updatePositions();
    });
});

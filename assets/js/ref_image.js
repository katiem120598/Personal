document.addEventListener("DOMContentLoaded", function () {
    const referenceImage = document.querySelector("img.reference-image");
    const dependentImages = document.querySelectorAll("img.dependent-image");
    const fillerElements = document.querySelectorAll(".filler-image");
    const fillerContainers = document.querySelectorAll(".filler-container");

    const updatePositions = () => {
        if (!referenceImage) return;

        // Get reference image's bounding box
        const refBounds = referenceImage.getBoundingClientRect();

        // Dynamically size and position the reference image
        const viewportHeight = window.innerHeight * 0.9; // 90% of viewport height
        const viewportWidth = window.innerWidth * 0.8; // 80% of viewport width
        const naturalHeight = referenceImage.naturalHeight;
        const naturalWidth = referenceImage.naturalWidth;

        const heightScale = viewportHeight / naturalHeight;
        const widthScale = viewportWidth / naturalWidth;
        const scale = Math.min(heightScale, widthScale);

        referenceImage.style.width = `${naturalWidth * scale}px`;
        referenceImage.style.height = `${naturalHeight * scale}px`;

        console.log("Reference Image Updated:", {
            width: referenceImage.style.width,
            height: referenceImage.style.height,
        });

        fillerElements.forEach((fillerElement, index) => {
            const initialTop = parseFloat(fillerElement.dataset.top || 0); // % of reference height
            const initialLeft = parseFloat(fillerElement.dataset.left || 0); // % of reference width
            const initialSize = parseFloat(fillerElement.dataset.size || 0.2); // % of reference width
        
            // Ensure media is fully loaded before calculating dimensions
            const fillerNaturalWidth = fillerElement.naturalWidth || fillerElement.videoWidth || 1;
            const fillerNaturalHeight = fillerElement.naturalHeight || fillerElement.videoHeight || 1;
            const aspectRatio = fillerNaturalWidth / fillerNaturalHeight;
        
            // Calculate dimensions based on reference bounds
            const calculatedWidth = initialSize * refBounds.width;
            const calculatedHeight = calculatedWidth / aspectRatio;
        
            // Calculate positions based on reference bounds
            const absoluteTop = refBounds.top + (initialTop / 100) * refBounds.height;
            const absoluteLeft = refBounds.left + (initialLeft / 100) * refBounds.width;
        
            // Match the container
            const fillerContainer = fillerContainers[index];
            if (!fillerContainer) {
                console.warn(`No corresponding container for filler element at index ${index}`);
                return;
            }
        
            // Apply styles to the filler container
            Object.assign(fillerContainer.style, {
                width: `${calculatedWidth}px`,
                height: `${calculatedHeight}px`,
                position: "absolute",
                top: `${absoluteTop}px`,
                left: `${absoluteLeft}px`
            });
        
            // Make sure the fillerElement is styled correctly
            fillerContainer.appendChild(fillerElement); // Ensure element is inside the container
        });
        

        // Position dependent images
        let cumulativeHeight = -0.39 * referenceImage.clientHeight;
        let cumulativeWidth = 0;

        dependentImages.forEach((image) => {
            image.style.position = "relative";
            image.style.top = `${cumulativeHeight}px`;
            image.style.left = `-${cumulativeWidth + 0.005 * referenceImage.clientWidth}px`;
            image.style.height = `${0.17 * referenceImage.clientHeight}px`;

            cumulativeHeight += image.clientHeight + 0.002 * referenceImage.clientHeight;
            cumulativeWidth += image.clientWidth;
        });
    };

    const handleImageLoad = () => {
        if (referenceImage.complete) {
            updatePositions();
        } else {
            referenceImage.addEventListener("load", updatePositions);
        }
    };

    // Use ResizeObserver to handle dynamic resizing
    const resizeObserver = new ResizeObserver(() => {
        console.log("ResizeObserver triggered");
        updatePositions();
    });

    if (referenceImage) {
        resizeObserver.observe(referenceImage);
    }

    // Handle initial layout setup
    handleImageLoad();

    // Fallback: Also listen to window resize for additional updates
    window.addEventListener("resize", () => {
        console.log("Window resize triggered");
        updatePositions();
    });
});

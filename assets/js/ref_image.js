document.addEventListener("DOMContentLoaded", function () {
    const referenceImage = document.querySelector("img.reference-image");
    const dependentImages = document.querySelectorAll("img.dependent-image");
    const fillerElements = document.querySelectorAll(".filler-image");
    const hoverTextElements = document.querySelectorAll(".hover-text");

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

        // Update filler elements and their corresponding hover texts
        fillerElements.forEach((fillerElement, index) => {
            const initialTop = parseFloat(fillerElement.dataset.top || 0); // % of reference height
            const initialLeft = parseFloat(fillerElement.dataset.left || 0); // % of reference width
            const initialSize = parseFloat(fillerElement.dataset.size || 0.2); // % of reference width

            // Preserve aspect ratio for filler element
            const fillerNaturalWidth = fillerElement.naturalWidth || fillerElement.videoWidth;
            const fillerNaturalHeight = fillerElement.naturalHeight || fillerElement.videoHeight;
            const aspectRatio = fillerNaturalWidth / fillerNaturalHeight;

            // Calculate dimensions
            const calculatedWidth = initialSize * refBounds.width;
            const calculatedHeight = calculatedWidth / aspectRatio;

            // Calculate positions
            const absoluteTop = refBounds.top + (initialTop / 100) * refBounds.height;
            const absoluteLeft = refBounds.left + (initialLeft / 100) * refBounds.width;

            // Apply styles to the filler element
            fillerElement.style.width = `${calculatedWidth}px`;
            fillerElement.style.height = `${calculatedHeight}px`;
            fillerElement.style.position = "absolute";
            fillerElement.style.top = `${absoluteTop}px`;
            fillerElement.style.left = `${absoluteLeft}px`;

            // Apply styles to the hover text if it exists
            const hoverText = hoverTextElements[index];
            const textHeight = hoverText.offsetHeight; // Get the actual height of the hover text element
            const textWidth = calculatedWidth -30;
            hoverText.style.width = `${calculatedWidth-30}px`;
            hoverText.style.height = `auto`; // Allow the height to adjust dynamically based on content
            hoverText.style.position = "absolute";
            hoverText.style.top = `${absoluteTop + (calculatedHeight - textHeight) / 2}px`; // Center vertically
            hoverText.style.left = `${absoluteLeft + (calculatedWidth-textWidth) / 2}px`; // Center horizontally
            //hoverText.style.transform = "translate(-50%, -50%)";
            hoverText.style.fontSize = `${0.02 * referenceImage.clientHeight}px`; // Set the font size based on the reference image width;
            hoverText.style.textAlign = "center";
            hoverText.style.pointerEvents = "none"; // Ensure the text doesn't interfere with hover functionality
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

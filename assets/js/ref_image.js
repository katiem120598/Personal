document.addEventListener("DOMContentLoaded", function () {
    const referenceImage = document.querySelector("img.reference-image");
    const dependentImages = document.querySelectorAll("img.dependent-image");
    const fillerElements = document.querySelectorAll(".filler-image"); // Includes all filler images/videos
    const fillerLinks = document.querySelectorAll(".filler-link");

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

        // Update filler elements (image or video) and their corresponding filler links
        fillerElements.forEach((fillerElement, index) => {
            const refBounds = referenceImage.getBoundingClientRect();

            // Parse initial positions and size from data attributes
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

            // Apply the same styles to the corresponding filler link
            if (fillerLinks[index]) {
                const fillerLink = fillerLinks[index];
                fillerLink.style.width = `${calculatedWidth}px`;
                fillerLink.style.height = `${calculatedHeight}px`;
                fillerLink.style.position = "absolute";
                fillerLink.style.top = `${absoluteTop}px`;
                fillerLink.style.left = `${absoluteLeft}px`;
                fillerLink.style.zIndex = "102"; // Ensure links are above filler images
            }

            console.log("Filler Element and Link Updated:", {
                fillerElementTag: fillerElement.tagName,
                linkPosition: fillerLinks[index]?.style,
            });
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

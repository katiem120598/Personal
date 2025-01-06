document.addEventListener("DOMContentLoaded", function () {
    const referenceImage = document.querySelector("img.reference-image");
    const dependentImages = document.querySelectorAll("img.dependent-image");
    const fillerElements = document.querySelectorAll(".filler-image"); // Includes all filler images/videos
    const fillerLinks = document.querySelectorAll(".filler-link"); // Links associated with filler images

    const updatePositions = () => {
        if (referenceImage) {
            // Ensure the reference image scales correctly within its bounds
            const viewportHeight = window.innerHeight * 0.9; // 90% of viewport height
            const viewportWidth = window.innerWidth * 0.8; // 80% of viewport width

            const naturalHeight = referenceImage.naturalHeight; // Original image height
            const naturalWidth = referenceImage.naturalWidth; // Original image width

            // Calculate scaling factors for height and width
            const heightScale = viewportHeight / naturalHeight;
            const widthScale = viewportWidth / naturalWidth;

            // Use the smaller scale to maintain aspect ratio
            const scale = Math.min(heightScale, widthScale);

            // Apply the calculated scale
            referenceImage.style.width = `${naturalWidth * scale}px`;
            referenceImage.style.height = `${naturalHeight * scale}px`;

            console.log("Reference Image Updated:", {
                width: referenceImage.style.width,
                height: referenceImage.style.height,
            });

            // Update each filler element (image or video)
            fillerElements.forEach((fillerElement, index) => {
                const refBounds = referenceImage.getBoundingClientRect();

                // Parse initial positions from HTML data attributes
                const initialTop = parseFloat(fillerElement.dataset.top || 0); // Set via data-top (percentage of reference image height)
                const initialLeft = parseFloat(fillerElement.dataset.left || 0); // Set via data-left (percentage of reference image width)
                const initialSize = parseFloat(fillerElement.dataset.size || 0.2); // Default size is 20% of reference width

                // Preserve aspect ratio
                const fillerNaturalWidth = fillerElement.naturalWidth || fillerElement.videoWidth; // For <img> and <video>
                const fillerNaturalHeight = fillerElement.naturalHeight || fillerElement.videoHeight;
                const aspectRatio = fillerNaturalWidth / fillerNaturalHeight;

                // Set the width and calculate the height to preserve aspect ratio
                const calculatedWidth = initialSize * refBounds.width;
                const calculatedHeight = calculatedWidth / aspectRatio;

                // Calculate absolute positions relative to the reference image
                const absoluteTop = refBounds.top + (initialTop / 100) * refBounds.height;
                const absoluteLeft = refBounds.left + (initialLeft / 100) * refBounds.width;

                fillerElement.style.width = `${calculatedWidth}px`;
                fillerElement.style.height = `${calculatedHeight}px`; // Maintain aspect ratio
                fillerElement.style.position = "absolute";
                fillerElement.style.top = `${absoluteTop}px`;
                fillerElement.style.left = `${absoluteLeft}px`;

                console.log("Filler Element Updated:", {
                    tagName: fillerElement.tagName,
                    top: fillerElement.style.top,
                    left: fillerElement.style.left,
                    width: fillerElement.style.width,
                    height: fillerElement.style.height,
                });

                // Update the associated filler link if it exists
                if (fillerLinks[index]) {
                    const link = fillerLinks[index];
                    link.style.position = "absolute";
                    link.style.top = `${absoluteTop}px`;
                    link.style.left = `${absoluteLeft}px`;
                    link.style.width = `${calculatedWidth}px`;
                    link.style.height = `${calculatedHeight}px`;
                    link.style.zIndex = "101"; // Ensure links are above filler images
                    link.style.background = "rgba(0, 0, 0, 0)"; // Ensure links are visually transparent
                }
            });
        }

        // Position dependent images (unchanged logic)
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

document.addEventListener("DOMContentLoaded", function () {
    const referenceImage = document.querySelector("img.reference-image");
    const dependentImages = document.querySelectorAll("img.dependent-image");
    const fillerContainers = document.querySelectorAll(".filler-container");
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

        // Position and size filler containers relative to the reference image
        fillerContainers.forEach((container, index) => {
            const fillerElement = container.querySelector(".filler-image");

            if (!fillerElement) {
                console.warn("No filler image found in container");
                return;
            }

            const topPercentage = parseFloat(container.dataset.top || 0); // % of reference height
            const leftPercentage = parseFloat(container.dataset.left || 0); // % of reference width
            const widthPercentage = parseFloat(container.dataset.width || 0.2); // % of reference width
            const heightPercentage = parseFloat(container.dataset.height || 0.2); // % of reference height

            const absoluteTop = refBounds.top + (topPercentage / 100) * refBounds.height;
            const absoluteLeft = refBounds.left + (leftPercentage / 100) * refBounds.width;
            const absoluteWidth = (widthPercentage / 100) * refBounds.width;
            const absoluteHeight = (heightPercentage / 100) * refBounds.height;

            Object.assign(container.style, {
                position: "absolute",
                top: `${absoluteTop}px`,
                left: `${absoluteLeft}px`,
                width: `${absoluteWidth}px`,
                height: `${absoluteHeight}px`,
            });

            // Ensure filler image covers the container
            Object.assign(fillerElement.style, {
                width: "100%",
                height: "100%",
                objectFit: "cover", // Ensures the video scales correctly
            });

            // Update the associated filler link if it exists
            if (fillerLinks[index]) {
                const link = fillerLinks[index];
                Object.assign(link.style, {
                    position: "absolute",
                    top: `${absoluteTop}px`,
                    left: `${absoluteLeft}px`,
                    width: `${absoluteWidth}px`,
                    height: `${absoluteHeight}px`,
                    zIndex: "101", // Ensure links are above filler images
                    background: "rgba(0, 0, 0, 0)", // Ensure links are visually transparent
                });
            }
        });

        // Position dependent images relative to each other
        
        let cumulativeHeight = -0.39 * referenceImage.clientHeight;
        let cumulativeWidth = 0;

        dependentImages.forEach((image) => {
            image.style.position = "relative";
            image.style.top = `${cumulativeHeight+0.05*referenceImage.clientHeight}px`;
            image.style.left = `-${cumulativeWidth + 0.005 * referenceImage.clientWidth}px`;
            image.style.height = `${0.17 * referenceImage.clientHeight}px`;

            cumulativeHeight += image.clientHeight + 0.002 * referenceImage.clientHeight;
            cumulativeWidth += image.clientWidth;
        });
    };

    const handleVideoMetadataLoad = (video) => {
        if (video.readyState >= 2) {
            console.log(`Video metadata loaded for ${video.src}`);
            updatePositions();
        } else {
            video.addEventListener("loadedmetadata", () => {
                console.log(`Video metadata event fired for ${video.src}`);
                updatePositions();
            });
        }
    };

    const handleImageLoad = () => {
        if (referenceImage.complete && referenceImage.naturalWidth > 0) {
            console.log("Reference Image Loaded (Complete)");
            updatePositions();

            // Ensure all videos are ready
            fillerContainers.forEach((container) => {
                const video = container.querySelector("video.filler-image");
                if (video) {
                    handleVideoMetadataLoad(video);
                }
            });
        } else {
            referenceImage.addEventListener("load", () => {
                console.log("Reference Image Loaded (Event)");
                updatePositions();

                // Ensure all videos are ready
                fillerContainers.forEach((container) => {
                    const video = container.querySelector("video.filler-image");
                    if (video) {
                        handleVideoMetadataLoad(video);
                    }
                });
            });
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

    // Ensure initial layout setup
    handleImageLoad();

    // Listen for window resize events
    window.addEventListener("resize", () => {
        console.log("Window resize triggered");
        updatePositions();
    });
});
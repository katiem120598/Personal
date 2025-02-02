document.addEventListener("DOMContentLoaded", function () {
    const referenceImage = document.querySelector("img.reference-image");
    const fillerElements = document.querySelectorAll(".filler-image");
    const canvas = document.getElementById("reference-canvas");
    const ctx = canvas.getContext("2d");

    // Setup canvas
    const setupCanvas = () => {
        canvas.width = referenceImage.naturalWidth;
        canvas.height = referenceImage.naturalHeight;
        // ctx.drawImage(referenceImage, 0, 0, canvas.width, canvas.height);
        console.log("Canvas setup completed with width:", canvas.width, "and height:", canvas.height);
    };

    // Check if a given coordinate on the canvas is transparent
    const isTransparent = (x, y) => {
        const pixel = ctx.getImageData(x, y, 1, 1).data;
        return pixel[3] === 0; // Alpha channel is 0 if transparent
    };

    const handleMouseMove = (event) => {
        const rect = canvas.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * canvas.width;
        const y = ((event.clientY - rect.top) / rect.height) * canvas.height;

        fillerElements.forEach((fillerElement) => {
            const fillerRect = {
                top: fillerElement.offsetTop,
                left: fillerElement.offsetLeft,
                right: fillerElement.offsetLeft + fillerElement.offsetWidth,
                bottom: fillerElement.offsetTop + fillerElement.offsetHeight
            };

            const isInsideFiller =
                event.clientX >= fillerRect.left &&
                event.clientX <= fillerRect.right &&
                event.clientY >= fillerRect.top &&
                event.clientY <= fillerRect.bottom;

            if (isInsideFiller) {
                fillerElement.classList.add("hovered");
            } else {
                fillerElement.classList.remove("hovered");
            }
        });
    };

    const handleImageLoad = () => {
        referenceImage.addEventListener("load", setupCanvas);
        if (referenceImage.complete) {
            setupCanvas();
        }
    };

    document.getElementById("main").addEventListener("mousemove", handleMouseMove);

    handleImageLoad();

    // Debugging logs (remove if unnecessary)
    console.log("Script initialized.");
});

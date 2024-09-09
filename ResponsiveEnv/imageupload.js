document.getElementById('imageUpload').addEventListener('change', function(e) {
    if (e.target.files && e.target.files[0]) {
        // Create a FileReader to read the uploaded file
        var reader = new FileReader();
        
        reader.onload = function(event) {
            // Create a new Image
            var img = new Image();
            
            img.onload = function() {
                // Canvas 1: Draw the original image scaled to 300x300
                var canvasOriginal = document.getElementById('canvasOriginal');
                var ctxOriginal = canvasOriginal.getContext('2d');
                canvasOriginal.width = 300;
                canvasOriginal.height = 300;
                
                // Calculate the scaling factor and draw the image
                var scale = Math.min(canvasOriginal.width / img.width, canvasOriginal.height / img.height);
                var imgWidthScaled = img.width * scale;
                var imgHeightScaled = img.height * scale;
                var dx = (canvasOriginal.width - imgWidthScaled) / 2;
                var dy = (canvasOriginal.height - imgHeightScaled) / 2;
                ctxOriginal.drawImage(img, dx, dy, imgWidthScaled, imgHeightScaled);
                
                // Canvas 2: Draw the image with an opacity gradient
                var canvasWithOpacity = document.getElementById('canvasWithOpacity');
                var ctxWithOpacity = canvasWithOpacity.getContext('2d');
                canvasWithOpacity.width = 300; // Use original image width
                canvasWithOpacity.height = 300; // Use original image height
                
                // Clear the second canvas before drawing
                ctxWithOpacity.clearRect(0, 0, canvasWithOpacity.width, canvasWithOpacity.height);

                ctxWithOpacity.save(); // Save the current context state
                ctxWithOpacity.translate(0, canvasWithOpacity.height); // Move the context to bottom
                ctxWithOpacity.scale(1, -1); // Flip the context vertically
                
                // Draw the image normally
                ctxWithOpacity.drawImage(img, dx, dy, imgWidthScaled, imgHeightScaled);
                
                // Create a linear gradient (vertical)
                var gradient = ctxWithOpacity.createLinearGradient(0, canvasWithOpacity.height,0,  0);
                
                // Define the gradient stops
                gradient.addColorStop(0, 'rgba(255, 255, 255, 0)'); // Start with transparent
                gradient.addColorStop(1, 'rgba(255, 255, 255, 1)'); // End with opaque
                
                // Set the global composite operation to 'destination-in'
                // This will apply the gradient as an alpha mask to the image
                ctxWithOpacity.globalCompositeOperation = 'destination-in';
                
                // Fill the canvas with the gradient
                // This applies the gradient opacity effect to the image
                ctxWithOpacity.fillStyle = gradient;
                ctxWithOpacity.fillRect(0, 0, canvasWithOpacity.width, canvasWithOpacity.height);
                
                // Reset the global composite operation to default
                ctxWithOpacity.globalCompositeOperation = 'source-over';
            };
            
            // Set the src of the Image to the result from the FileReader
            img.src = event.target.result;
        };
        
        // Read the file as a data URL (base64)
        reader.readAsDataURL(e.target.files[0]);
    }
});
function addSparkle() {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = Math.random() * 100 + '%';
    sparkle.style.top = Math.random() * 100 + '%';
    document.querySelector('.sparkle-gradient').appendChild(sparkle);

    setTimeout(() => {
        sparkle.remove();
    }, 2000); // Sparkle disappears after 2 seconds
}

setInterval(addSparkle, 150); // Add a new sparkle every 150 milliseconds
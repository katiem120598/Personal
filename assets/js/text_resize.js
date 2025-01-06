function adjustFontSize(container) {
    const hoverText = container.querySelector('.hover-text');
    if (!hoverText) return;

    const containerBounds = container.getBoundingClientRect();
    let fontSize = parseFloat(window.getComputedStyle(hoverText).fontSize);

    // Continuously adjust font size to fit within container
    let hoverTextBounds = hoverText.getBoundingClientRect();

    // Reduce font size if the text overflows the container
    while (
        (hoverTextBounds.width > containerBounds.width || hoverTextBounds.height > containerBounds.height) &&
        fontSize > 4 // Minimum font size
    ) {
        fontSize -= 1; // Decrease font size
        hoverText.style.fontSize = `${fontSize}px`;
        hoverTextBounds = hoverText.getBoundingClientRect(); // Recalculate bounds
    }

    // Increase font size if there is extra space in the container
    while (
        (hoverTextBounds.width < containerBounds.width && hoverTextBounds.height < containerBounds.height) &&
        fontSize < containerBounds.height / 2 // Cap font size to a fraction of the container height
    ) {
        fontSize += 1; // Increase font size
        hoverText.style.fontSize = `${fontSize}px`;
        hoverTextBounds = hoverText.getBoundingClientRect(); // Recalculate bounds
    }
}

// Apply resizing to all filler containers
fillerContainers.forEach(container => {
    adjustFontSize(container);

    // Optionally, add a resize observer for dynamic updates
    const resizeObserver = new ResizeObserver(() => adjustFontSize(container));
    resizeObserver.observe(container);
});

(function() {
    const maxTranslateX = 100;
    const maxTranslateY = 200;

    document.querySelectorAll('.random-image').forEach(img => {
        const containerWidth = document.documentElement.clientWidth;
        const containerHeight = document.documentElement.clientHeight;

        const randomLeft = Math.random() * Math.max(0, containerWidth - maxTranslateX);
        const randomTop = Math.random() * Math.max(0, containerHeight - maxTranslateY);

        const randx1 = (Math.random() * 2 - 1) * maxTranslateX;
        const randy1 = (Math.random() * 2 - 1) * maxTranslateY;
        const randx2 = (Math.random() * 2 - 1) * maxTranslateX;
        const randy2 = (Math.random() * 2 - 1) * maxTranslateY;
        const randx3 = (Math.random() * 2 - 1) * maxTranslateX;
        const randy3 = (Math.random() * 2 - 1) * maxTranslateY;

        const randomWidth = 100 + Math.random() * 100;
        const randomScale1 = Math.random() * 2 - 1;
        const randomScale2 = Math.random() * 2 - 1;
        const randrot1 = Math.random() * 720 - 360;
        const randrot2 = Math.random() * 720 - 360;

        img.style.width = randomWidth + 'px';
        img.style.setProperty('--random-top', randomTop + 'px');
        img.style.setProperty('--random-left', randomLeft + 'px');
        img.style.setProperty('--random-scale1', randomScale1);
        img.style.setProperty('--random-scale2', randomScale2);
        img.style.setProperty('--randrot1', randrot1 + 'deg');
        img.style.setProperty('--randrot2', randrot2 + 'deg');
        img.style.setProperty('--randx1', randx1 + 'px');
        img.style.setProperty('--randy1', randy1 + 'px');
        img.style.setProperty('--randx2', randx2 + 'px');
        img.style.setProperty('--randy2', randy2 + 'px');
        img.style.setProperty('--randx3', randx3 + 'px');
        img.style.setProperty('--randy3', randy3 + 'px');
    });
})();
document.querySelectorAll('.random-image').forEach(img => {
    const containerWidth = document.documentElement.clientWidth; // or container's clientWidth
    const containerHeight = document.documentElement.clientHeight; // or container's clientHeight
    const maxTranslateX = 100; // Maximum translation in X direction
    const maxTranslateY = 200; // Maximum translation in Y direction

    const randomLeft = Math.random() * Math.abs(containerWidth - maxTranslateX);
    const randomTop = Math.random() * Math.abs(containerHeight - maxTranslateY);
    const randomRight = Math.random() * Math.abs(maxTranslateX);
    const randomBottom = Math.random() * Math.abs(maxTranslateY);

    const randx1 = (Math.random() * 2 - 1) * maxTranslateX; // Random X between -maxTranslateX and maxTranslateX
    const randy1 = (Math.random() * 2 - 1) * maxTranslateY; // Random Y between -maxTranslateY and maxTranslateY
    const randx2 = (Math.random() * 2 - 1) * maxTranslateX; // Random X between -maxTranslateX and maxTranslateX
    const randy2 = (Math.random() * 2 - 1) * maxTranslateY; // Random Y between -maxTranslateY and maxTranslateY            
    const randx3 = (Math.random() * 2 - 1) * maxTranslateX; // Random X between -maxTranslateX and maxTranslateX
    const randy3 = (Math.random() * 2 - 1) * maxTranslateY; // Random Y between -maxTranslateY and maxTranslateY

    img.style.setProperty('--random-top', Math.random() * 100);
    img.style.setProperty('--random-left', Math.random() * 100);
    let randomWidth = 100 + Math.random() * 100; // Random width between 100px and 200px
    img.style.width = randomWidth + 'px';
    // Random scale
    let randomScale1 = Math.random() * 2-1; // Random scale between 0.5 and 2
    img.style.setProperty('--random-scale1', randomScale1);
    let randomScale2 = Math.random() * 2-1; // Random scale between 0.5 and 2
    img.style.setProperty('--random-scale2', randomScale2);
    let randrot1 = Math.random()*720-360; // Random scale between 0.5 and 2
    let randrot2 = Math.random()*720-360;
    img.style.setProperty('--randrot1', randrot1+'deg');
    img.style.setProperty('--randrot2', randrot2+'deg');

    img.style.setProperty('--random-top', randomTop + 'px');
    img.style.setProperty('--random-left', randomLeft + 'px');

    img.style.setProperty('--randx1', randx1+'px');
    img.style.setProperty('--randy1', randy1+'px');
    img.style.setProperty('--randx2', randx2+'px');
    img.style.setProperty('--randy2', randy2+'px');
    img.style.setProperty('--randx3', randx3+'px');
    img.style.setProperty('--randy3', randy3+'px');
});
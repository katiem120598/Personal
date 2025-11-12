let projectsData = null;
let pageFlip = null;
let currentCategory = null;
let isMobileView = false;

async function loadProjects() {
    try {
        const response = await fetch('assets/data/projects.json');
        projectsData = await response.json();
        initializeTabs();
        const firstCategory = Object.keys(projectsData.categories)[0];
        setTimeout(() => loadCategory(firstCategory), 100);
    } catch (error) {
        console.error('Error loading projects:', error);
    }
}

function initializeTabs() {
    const tabsContainer = document.getElementById('category-tabs');
    tabsContainer.innerHTML = '';
    
    Object.entries(projectsData.categories).forEach(([categoryKey, category]) => {
        const button = document.createElement('button');
        button.className = 'tab-button';
        button.textContent = category.title;
        
        button.addEventListener('click', () => {
            document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            loadCategory(categoryKey);
        });
        
        tabsContainer.appendChild(button);
    });
    
    document.querySelector('.tab-button').classList.add('active');
}

function loadCategory(categoryKey) {
    if (currentCategory === categoryKey && pageFlip) return;
    
    currentCategory = categoryKey;
    const category = projectsData.categories[categoryKey];
    
    if (pageFlip) {
        pageFlip.destroy();
        pageFlip = null;
    }
    
    checkMobileView();
    
    if (isMobileView) {
        createMobileView(category.projects);
    } else {
        createFlipbook(category.projects);
    }
}

function createFlipbook(projects) {
    const flipbookContainer = document.getElementById('flipbook');
    if (!flipbookContainer) return;
    
    flipbookContainer.innerHTML = '';
    flipbookContainer.removeAttribute('style');
    
    flipbookContainer.appendChild(createCoverPage());
    
    const projectsPerPage = 4;
    for (let i = 0; i < projects.length; i += projectsPerPage) {
        const pageProjects = projects.slice(i, i + projectsPerPage);
        flipbookContainer.appendChild(createProjectPage(pageProjects));
    }
    
    flipbookContainer.appendChild(createBackCoverPage());
    
    initializePageFlip();
}

function createCoverPage() {
    const page = document.createElement('div');
    page.className = 'page page-hard';
    page.innerHTML = `
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; color: white;">
            <h1 style="font-family: 'girlypop', sans-serif; font-size: 3rem; margin: 20px 0;">
                ${projectsData.categories[currentCategory].title}
            </h1>
            <p style="font-family: Work Sans, sans-serif; font-size: 1.2rem;">my scrapbook ✨</p>
        </div>
    `;
    return page;
}

function createBackCoverPage() {
    const page = document.createElement('div');
    page.className = 'page page-hard';
    return page;
}

function createProjectPage(projects) {
    const page = document.createElement('div');
    page.className = 'page';
    
    const pageContent = document.createElement('div');
    pageContent.className = 'page-content';
    
    projects.forEach(project => {
        const item = document.createElement('div');
        item.className = 'scrapbook-item';
        
        item.innerHTML = `
            <img src="${project.thumbnail}" alt="${project.title}" loading="lazy">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-tags">
                ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
            </div>
        `;
        
        item.addEventListener('click', () => openProjectModal(project));
        pageContent.appendChild(item);
    });
    
    while (pageContent.children.length < 4) {
        const emptyItem = document.createElement('div');
        emptyItem.style.visibility = 'hidden';
        pageContent.appendChild(emptyItem);
    }
    
    page.appendChild(pageContent);
    return page;
}

function checkMobileView() {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const smallScreen = window.innerWidth < 768;
    isMobileView = reducedMotion || smallScreen;
}

function createMobileView(projects) {
    const flipbookContainer = document.getElementById('flipbook');
    if (!flipbookContainer) return;
    
    flipbookContainer.innerHTML = '';
    flipbookContainer.style.display = 'flex';
    flipbookContainer.style.flexDirection = 'column';
    flipbookContainer.style.gap = '20px';
    flipbookContainer.style.padding = '20px';
    flipbookContainer.style.maxWidth = '600px';
    flipbookContainer.style.margin = '0 auto';
    
    projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'scrapbook-item';
        card.style.transform = 'none';
        
        card.innerHTML = `
            <img src="${project.thumbnail}" alt="${project.title}" loading="lazy">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-tags">
                ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
            </div>
        `;
        
        card.addEventListener('click', () => openProjectModal(project));
        flipbookContainer.appendChild(card);
    });
    
    document.querySelector('.book-controls').style.display = 'none';
}

function initializePageFlip() {
    const flipbookContainer = document.getElementById('flipbook');
    const pages = flipbookContainer.querySelectorAll('.page');
    
    if (pages.length === 0) return;
    
    flipbookContainer.style.display = '';
    document.querySelector('.book-controls').style.display = 'flex';
    
    const containerWidth = document.getElementById('book-wrapper').offsetWidth;
    const containerHeight = document.getElementById('book-wrapper').offsetHeight;
    const pageWidth = Math.min(500, containerWidth * 0.4);
    const pageHeight = Math.min(700, containerHeight * 0.9);
    
    pageFlip = new St.PageFlip(flipbookContainer, {
        width: pageWidth,
        height: pageHeight,
        size: 'stretch',
        minWidth: 300,
        maxWidth: 500,
        minHeight: 400,
        maxHeight: 700,
        maxShadowOpacity: 0.5,
        showCover: true,
        mobileScrollSupport: true,
        swipeDistance: 30,
        clickEventForward: true,
        usePortrait: false,
        startPage: 0,
        drawShadow: true,
        flippingTime: 1000
    });
    
    pageFlip.loadFromHTML(pages);
    updatePageInfo();
    
    pageFlip.on('flip', updatePageInfo);
    
    document.getElementById('prev-page').addEventListener('click', () => {
        if (pageFlip) pageFlip.flipPrev();
    });
    
    document.getElementById('next-page').addEventListener('click', () => {
        if (pageFlip) pageFlip.flipNext();
    });
}

function updatePageInfo() {
    if (!pageFlip) return;
    
    const currentPage = pageFlip.getCurrentPageIndex();
    const totalPages = pageFlip.getPageCount();
    
    document.getElementById('page-info').textContent = `page ${currentPage + 1} of ${totalPages}`;
    document.getElementById('prev-page').disabled = currentPage === 0;
    document.getElementById('next-page').disabled = currentPage >= totalPages - 1;
}

function openProjectModal(project) {
    const modal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body');
    
    modalBody.innerHTML = `
        <div class="modal-body">
            <h2>${project.title}</h2>
            <p>${project.details.fullDescription}</p>
            ${project.thumbnail ? `<img src="${project.thumbnail}" alt="${project.title}">` : ''}
            <div class="tech-list">
                ${project.details.technologies ? 
                    project.details.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('') : ''}
            </div>
            ${project.details.year ? `<p><strong>Year:</strong> ${project.details.year}</p>` : ''}
            ${project.details.link ? `<a href="${project.details.link}" target="_blank">view full project →</a>` : ''}
        </div>
    `;
    
    modal.showModal();
    modal.querySelector('.modal-close').focus();
}

document.addEventListener('DOMContentLoaded', () => {
    loadProjects();
    
    const modal = document.getElementById('project-modal');
    
    document.querySelector('.modal-close').addEventListener('click', () => modal.close());
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.close();
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.open) modal.close();
    });
    
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            if (currentCategory) {
                const wasPageFlip = pageFlip !== null;
                checkMobileView();
                
                if (wasPageFlip !== !isMobileView) {
                    loadCategory(currentCategory);
                }
            }
        }, 300);
    });
});

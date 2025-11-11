let projectsData = null;
let pageFlip = null;
let currentCategory = null;

async function loadProjects() {
    try {
        const response = await fetch('assets/data/projects.json');
        projectsData = await response.json();
        initializeTabs();
        const firstCategory = Object.keys(projectsData.categories)[0];
        loadCategory(firstCategory);
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
        button.dataset.category = categoryKey;
        
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
    if (currentCategory === categoryKey && pageFlip) {
        return;
    }
    
    currentCategory = categoryKey;
    const category = projectsData.categories[categoryKey];
    
    if (pageFlip) {
        pageFlip.destroy();
    }
    
    createFlipbook(category.projects);
}

function createFlipbook(projects) {
    const flipbookContainer = document.getElementById('flipbook');
    flipbookContainer.innerHTML = '';
    
    const coverPage = createCoverPage();
    flipbookContainer.appendChild(coverPage);
    
    for (let i = 0; i < projects.length; i += 2) {
        const leftProject = projects[i];
        const rightProject = projects[i + 1];
        
        const leftPage = createProjectPage(leftProject);
        flipbookContainer.appendChild(leftPage);
        
        if (rightProject) {
            const rightPage = createProjectPage(rightProject);
            flipbookContainer.appendChild(rightPage);
        } else {
            const emptyPage = createEmptyPage();
            flipbookContainer.appendChild(emptyPage);
        }
    }
    
    const backCover = createBackCoverPage();
    flipbookContainer.appendChild(backCover);
    
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
            <p style="font-family: Work Sans, sans-serif; font-size: 1.2rem;">
                my scrapbook ✨
            </p>
        </div>
    `;
    return page;
}

function createBackCoverPage() {
    const page = document.createElement('div');
    page.className = 'page page-hard';
    return page;
}

function createEmptyPage() {
    const page = document.createElement('div');
    page.className = 'page';
    return page;
}

function createProjectPage(project) {
    const page = document.createElement('div');
    page.className = 'page';
    
    page.innerHTML = `
        <div class="page-content">
            <div class="scrapbook-item" data-project='${JSON.stringify(project).replace(/'/g, "&apos;")}'>
                <img src="${project.thumbnail}" alt="${project.title}" loading="lazy">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                </div>
            </div>
        </div>
    `;
    
    const scrapbookItem = page.querySelector('.scrapbook-item');
    scrapbookItem.addEventListener('click', (e) => {
        e.stopPropagation();
        openProjectModal(project);
    });
    
    return page;
}

function initializePageFlip() {
    const flipbookContainer = document.getElementById('flipbook');
    const pages = flipbookContainer.querySelectorAll('.page');
    
    if (pages.length === 0) return;
    
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
        flippingTime: 1000,
        useMouseEvents: true,
        autoSize: true,
        showPageCorners: true,
        disableFlipByClick: false
    });
    
    pageFlip.loadFromHTML(pages);
    
    updatePageInfo();
    
    pageFlip.on('flip', (e) => {
        updatePageInfo();
    });
    
    document.getElementById('prev-page').addEventListener('click', () => {
        pageFlip.flipPrev();
    });
    
    document.getElementById('next-page').addEventListener('click', () => {
        pageFlip.flipNext();
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
                    project.details.technologies.map(tech => 
                        `<span class="tech-tag">${tech}</span>`
                    ).join('') : ''}
            </div>
            
            ${project.details.year ? `<p><strong>Year:</strong> ${project.details.year}</p>` : ''}
            
            ${project.details.link ? 
                `<a href="${project.details.link}" target="_blank">view full project →</a>` : ''}
        </div>
    `;
    
    modal.showModal();
    
    const closeBtn = modal.querySelector('.modal-close');
    if (closeBtn) {
        closeBtn.focus();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadProjects();
    
    const modal = document.getElementById('project-modal');
    const closeBtn = document.querySelector('.modal-close');
    let lastFocusedElement = null;
    
    closeBtn.addEventListener('click', () => {
        modal.close();
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.close();
        }
    });
    
    modal.addEventListener('close', () => {
        if (lastFocusedElement) {
            lastFocusedElement.focus();
        }
    });
    
    window.addEventListener('beforeModalOpen', () => {
        lastFocusedElement = document.activeElement;
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.open) {
            modal.close();
        }
    });
    
    window.addEventListener('resize', () => {
        if (pageFlip && currentCategory) {
            const category = projectsData.categories[currentCategory];
            createFlipbook(category.projects);
        }
    });
});

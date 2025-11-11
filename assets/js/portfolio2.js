let projectsData = null;

async function loadProjects() {
    try {
        const response = await fetch('assets/data/projects.json');
        projectsData = await response.json();
        renderProjects();
    } catch (error) {
        console.error('Error loading projects:', error);
        document.getElementById('projects-grid').innerHTML = 
            '<div class="loading-shimmer">error loading projects :(</div>';
    }
}

function renderProjects() {
    const grid = document.getElementById('projects-grid');
    grid.innerHTML = '';

    Object.entries(projectsData.categories).forEach(([categoryKey, category]) => {
        if (category.projects.length > 0) {
            const categoryHeader = document.createElement('h2');
            categoryHeader.className = 'category-header';
            categoryHeader.textContent = category.title;
            grid.appendChild(categoryHeader);
            
            category.projects.forEach((project, index) => {
                const card = createProjectCard(project, index);
                grid.appendChild(card);
            });
        }
    });
}

function createProjectCard(project, index) {
    const card = document.createElement('div');
    card.className = 'project-card';
    
    const rotation = (Math.random() - 0.5) * 4;
    card.style.setProperty('--card-rotate', `${rotation}deg`);
    
    card.innerHTML = `
        <img src="${project.thumbnail}" alt="${project.title}" loading="lazy">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="project-tags">
            ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
        </div>
    `;
    
    card.addEventListener('click', () => {
        window.dispatchEvent(new Event('beforeModalOpen'));
        openProjectModal(project);
    });
    
    return card;
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
});

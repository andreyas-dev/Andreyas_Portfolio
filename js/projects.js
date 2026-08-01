// projects.js - Manages project rendering using central portfolio data

const projects = (window.portfolioData && window.portfolioData.projects) ? window.portfolioData.projects : [];

function renderProjects() {
    const track = document.getElementById('projects-track');
    if (!track) return;

    const dataProjects = ((window.portfolioData && window.portfolioData.projects) 
        ? window.portfolioData.projects 
        : (typeof projects !== 'undefined' ? projects : [])).filter(p => p.visible !== false);

    if (!dataProjects || dataProjects.length === 0) return;

    const mediaHelper = window.PortfolioMediaHelper || {
        sanitizeLink: (url) => (!url || url === '#' || url.trim() === '') ? '#' : url
    };

    track.innerHTML = dataProjects.map(proj => {
        const thumbUrl = proj.media && proj.media.thumbnail 
            ? proj.media.thumbnail 
            : (proj.heroImage || '');
        
        const githubUrl = mediaHelper.sanitizeLink(proj.links?.github || proj.github);
        const demoUrl = mediaHelper.sanitizeLink(proj.links?.demo || proj.demo);
        const docsUrl = mediaHelper.sanitizeLink(proj.links?.docs || proj.docs);
        
        const descriptionText = proj.shortDescription || proj.description || '';

        return `
            <div class="project-card tilt-card">
                <div class="card-image" style="background-image: url('${thumbUrl}')"></div>
                <div class="card-content">
                    <h3>${proj.title}</h3>
                    <p>${descriptionText}</p>
                    <div class="card-actions">
                        <a href="project-detail.html?id=${proj.id}" class="btn btn-primary btn-sm magnetic">Detail</a>
                        ${githubUrl !== '#' ? `<a href="${githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm magnetic">Source</a>` : ''}
                        ${demoUrl !== '#' ? `<a href="${demoUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm magnetic">Demo</a>` : ''}
                        ${docsUrl !== '#' ? `<a href="${docsUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm magnetic">Docs</a>` : ''}
                    </div>
                </div>
            </div>
        `;
    }).join('');
}


// project-detail.js - Populates the project detail page from central portfolioData

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id');
    const container = document.getElementById('project-detail-container');

    if (!projectId || !container) return;

    const allProjects = (window.portfolioData && window.portfolioData.projects)
        ? window.portfolioData.projects
        : (typeof projects !== 'undefined' ? projects : []);

    const proj = allProjects.find(p => p.id === projectId);

    if (!proj) {
        container.innerHTML = `<h2 class="section-title">Project Not Found</h2><a href="index.html#projects" class="btn btn-primary magnetic">Go Back</a>`;
        return;
    }

    const mediaHelper = window.PortfolioMediaHelper || {
        formatDrivePreviewUrl: url => url,
        formatYouTubeEmbedUrl: url => url,
        sanitizeLink: url => url || '#'
    };

    // Extract links and media
    const heroImg = proj.media?.heroImage || proj.media?.thumbnail || proj.heroImage || '';
    const demoUrl = mediaHelper.sanitizeLink(proj.links?.demo || proj.demo);
    const githubUrl = mediaHelper.sanitizeLink(proj.links?.github || proj.github);
    const docsUrl = mediaHelper.sanitizeLink(proj.links?.docs || proj.docs);

    // Set page title dynamically
    const brandName = window.portfolioData?.personal?.brandName || 'Portfolio';
    document.title = `${proj.title} | ${brandName}`;

    const detailCardsHtml = `
        <div class="detail-card">
            <h4><i data-lucide="target"></i> Problem Statement</h4>
            <p>${proj.problemStatement || 'Detailed analysis of domain-specific engineering constraints.'}</p>
        </div>
        <div class="detail-card">
            <h4><i data-lucide="wrench"></i> Mechanical Design</h4>
            <p>${proj.mechanicalDesign || 'CAD modeling and structural stress optimization.'}</p>
        </div>
        <div class="detail-card">
            <h4><i data-lucide="cpu"></i> Electronics</h4>
            <p>${proj.electronics || 'Microcontroller architecture and sensor signal conditioning.'}</p>
        </div>
        <div class="detail-card">
            <h4><i data-lucide="code"></i> Software</h4>
            <p>${proj.software || 'Control algorithms and embedded firmware logic.'}</p>
        </div>
        <div class="detail-card">
            <h4><i data-lucide="alert-triangle"></i> Challenges</h4>
            <p>${proj.challenges || 'Iterative hardware-in-the-loop debugging.'}</p>
        </div>
        <div class="detail-card">
            <h4><i data-lucide="check-circle"></i> Results</h4>
            <p>${proj.results || 'Validated operational performance and metric targets.'}</p>
        </div>
    `;

    container.innerHTML = `
        <div class="project-detailed reveal">
            <div class="project-header">
                <div class="project-image-large" style="background-image: url('${heroImg}')">
                   <div class="project-links">
                       ${demoUrl !== '#' ? `<a href="${demoUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary magnetic"><i data-lucide="play"></i> Demo</a>` : ''}
                       ${githubUrl !== '#' ? `<a href="${githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-outline magnetic"><i data-lucide="github"></i> Source</a>` : ''}
                       ${docsUrl !== '#' ? `<a href="${docsUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-outline magnetic"><i data-lucide="file-text"></i> Docs</a>` : ''}
                   </div>
                </div>
                <div class="project-title-area">
                    <h3 class="glow-text">${proj.title}</h3>
                    <p class="lead">${proj.description || proj.shortDescription || ''}</p>
                </div>
            </div>
            <div class="project-body-scroller">
                <div class="project-details-track">
                    ${detailCardsHtml}
                    <!-- Duplicate for infinite scroll -->
                    ${detailCardsHtml}
                </div>
            </div>

            <div class="project-tech-section">

                ${
                    (proj.components || []).length
                        ? `
                        <div class="tech-group">
                            <h3>
                                <i data-lucide="package"></i>
                                Components Used
                            </h3>

                            <div class="tech-tags">
                                ${proj.components
                                    .map(item => `<span class="tech-tag">${item}</span>`)
                                    .join("")}
                            </div>
                        </div>
                        `
                        : ""
                }

                ${
                    (proj.tools || []).length
                        ? `
                        <div class="tech-group">
                            <h3>
                                <i data-lucide="hammer"></i>
                                Tools &amp; Technologies
                            </h3>

                            <div class="tech-tags">
                                ${proj.tools
                                    .map(item => `<span class="tech-tag">${item}</span>`)
                                    .join("")}
                            </div>
                        </div>
                        `
                        : ""
                }

            </div>

            ${window.EngineeringGallery ? window.EngineeringGallery.render(proj) : ""}
        </div>
    `;

    // Re-initialize Lucide icons for the newly injected HTML
    if (window.lucide) {
        lucide.createIcons();
    }

    // Wire up drag/wheel/swipe scrolling + lightbox for the Engineering Gallery
    if (window.EngineeringGallery) {
        window.EngineeringGallery.init();
    }
});
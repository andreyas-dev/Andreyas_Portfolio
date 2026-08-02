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

    // Define all possible detail cards. Each only renders if the
    // corresponding field exists (and is non-empty) on the project object.
    // No fallback/placeholder text is shown -- missing field = card hidden.
    const cardDefinitions = [
        { key: 'problemStatement', icon: 'target',         label: 'Problem Statement' },
        { key: 'mechanicalDesign', icon: 'wrench',         label: 'Mechanical Design' },
        { key: 'electronics',      icon: 'cpu',            label: 'Electronics' },
        { key: 'software',         icon: 'code',           label: 'Software' },
        { key: 'engineeringApproach', icon: 'settings',    label: 'Engineering Approach' },
        { key: 'challenges',       icon: 'alert-triangle', label: 'Challenges' },
        { key: 'results',          icon: 'check-circle',   label: 'Results' }
    ];

    const activeCards = cardDefinitions.filter(def => {
        const value = proj[def.key];
        return typeof value === 'string' && value.trim().length > 0;
    });

    const detailCardsHtml = activeCards
        .map(def => `
        <div class="detail-card">
            <h4><i data-lucide="${def.icon}"></i> ${def.label}</h4>
            <p>${proj[def.key]}</p>
        </div>
    `).join('');

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
            ${activeCards.length ? `
            <div class="project-body-scroller">
                <div class="project-details-track">
                    ${detailCardsHtml}
                    <!-- Duplicate for infinite scroll -->
                    ${detailCardsHtml}
                </div>
            </div>
            ` : ''}

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
